export default function validateSettings(settings: {}): boolean {
return settings.hasOwnProperty('coreSettings') &&
settings.hasOwnProperty('imageSettings');
}