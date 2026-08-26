import { AllSettings } from './settings/AllSettings';

export type UserType = {
    id: string,
    email: string,
    confirmed_at?: string,
    settings?: AllSettings
    timestamp?: number
}