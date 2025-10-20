export default function validateSettings(settings: {} | undefined): boolean {
// check settings exists and has required properties
    if (!settings) return false;
    return settings.hasOwnProperty('coreSettings') &&
    settings.hasOwnProperty('imageSettings');
}