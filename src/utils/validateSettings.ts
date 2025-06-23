export default function validateSettings(settings: {} | undefined): boolean {
if (!settings) return false;
return settings.hasOwnProperty('coreSettings') &&
settings.hasOwnProperty('imageSettings');
}