// Narrow an unknown caught value (catch bindings are `unknown` under strict
// mode) down to a printable string, so call sites can drop `catch (err: any)`.
export default function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Unknown error';
}
