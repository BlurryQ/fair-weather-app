import { CoreSettings } from './settings/CoreSettings';
import { ImageSettings } from './settings/ImageSettings';

export type UserType = {
    id: string,
    email: string,
    settings?: {
        coreSettings? :CoreSettings,
        imageSetteings? :ImageSettings
    }
}