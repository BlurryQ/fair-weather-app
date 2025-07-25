import { CoreSettings } from './CoreSettings';
import { ImageSettings } from './ImageSettings';
import { ImageUrls } from './ImageUrls';

export type AllSettings = {
    coreSettings: CoreSettings,
    imageSettings: ImageSettings,
    imageUrls?: ImageUrls[],
    timestamp: number
}