export default function validateSettings(settings: object | undefined): boolean {
// check settings exists and has required properties
    if (!settings) return false;
    return Object.prototype.hasOwnProperty.call(settings, 'coreSettings') &&
    Object.prototype.hasOwnProperty.call(settings, 'imageSettings');
}