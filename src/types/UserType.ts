import { AllSettings } from './settings/AllSettings';

export type UserType = {
    id: string,
    email: string,
    settings?: AllSettings
    timestamp?: number
}