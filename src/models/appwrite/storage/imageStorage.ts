import { ID, Query, Permission, Role } from 'appwrite';
import {
  account,
  databases,
  storage,
  DATABASE_ID,
  IMAGES_COLLECTION_ID,
  IMAGES_BUCKET_ID,
} from '../client';

// Appwrite storage has no folders. Each user image is one document in the
// `images` collection ({ user, name, file_id }) pointing at a bucket file.
// `imageName` keeps the Supabase-era "<userId>/<settingName>" shape used by
// callers, so we just split it back out here.
//
// Files are private (Role.user only). A plain <img src> cannot carry the
// Appwrite session cross-origin, so we fetch the bytes with a short-lived JWT
// and hand back an object URL. Those URLs are per-session: UserContext
// refreshes them on every load.

const OWNER = (userId: string) => [
  Permission.read(Role.user(userId)),
  Permission.update(Role.user(userId)),
  Permission.delete(Role.user(userId)),
];

let jwtCache = { token: '', exp: 0 };
async function getJwt(): Promise<string> {
  const now = Date.now();
  if (jwtCache.token && jwtCache.exp > now) return jwtCache.token;
  const { jwt } = await account.createJWT();
  // Appwrite JWTs last ~15 min; refresh a little early.
  jwtCache = { token: jwt, exp: now + 13 * 60 * 1000 };
  return jwt;
}

async function fetchObjectUrl(fileId: string): Promise<string | null> {
  try {
    const jwt = await getJwt();
    const url = String(storage.getFileView(IMAGES_BUCKET_ID, fileId));
    const res = await fetch(url, { headers: { 'X-Appwrite-JWT': jwt } });
    if (!res.ok) return null;
    return URL.createObjectURL(await res.blob());
  } catch (err: any) {
    console.error(err.message);
    return null;
  }
}

async function findImageDoc(userId: string, name: string) {
  const res = await databases.listDocuments(DATABASE_ID, IMAGES_COLLECTION_ID, [
    Query.equal('user', userId),
    Query.equal('name', name),
    Query.limit(1),
  ]);
  return res.documents[0] ?? null;
}

export async function uploadImage(imageName: string, file: File) {
  try {
    const [userId, name] = imageName.split('/');
    const existing = await findImageDoc(userId, name);

    const created = await storage.createFile(
      IMAGES_BUCKET_ID,
      ID.unique(),
      file,
      OWNER(userId)
    );

    if (existing) {
      const oldFileId = (existing as any).file_id as string | undefined;
      await databases.updateDocument(
        DATABASE_ID,
        IMAGES_COLLECTION_ID,
        existing.$id,
        { file_id: created.$id }
      );
      if (oldFileId) {
        await storage
          .deleteFile(IMAGES_BUCKET_ID, oldFileId)
          .catch(() => undefined);
      }
    } else {
      await databases.createDocument(
        DATABASE_ID,
        IMAGES_COLLECTION_ID,
        ID.unique(),
        { user: userId, name, file_id: created.$id },
        OWNER(userId)
      );
    }

    return { path: `${userId}/${name}` };
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function getAllImageUrls(id: string) {
  try {
    const res = await databases.listDocuments(DATABASE_ID, IMAGES_COLLECTION_ID, [
      Query.equal('user', id),
      Query.limit(100),
    ]);
    const results = await Promise.all(
      res.documents.map(async (doc: any) => {
        const url = await fetchObjectUrl(doc.file_id as string);
        return url ? { name: doc.name as string, url } : null;
      })
    );
    return results.filter((r): r is { name: string; url: string } => r !== null);
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function getImageUrl(imageName: string) {
  try {
    const [userId, name] = imageName.split('/');
    const doc = await findImageDoc(userId, name);
    if (!doc) return null;
    return fetchObjectUrl((doc as any).file_id as string);
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function deleteImage(imageData: string[]) {
  try {
    const [userId, name] = imageData;
    const doc = await findImageDoc(userId, name);
    if (!doc) return true;
    const fileId = (doc as any).file_id as string | undefined;
    await databases.deleteDocument(DATABASE_ID, IMAGES_COLLECTION_ID, doc.$id);
    if (fileId) {
      await storage.deleteFile(IMAGES_BUCKET_ID, fileId).catch(() => undefined);
    }
    return true;
  } catch (err: any) {
    console.error(err.message);
  }
}
