import { Channel, ContentItem, ContinueWatchingItem, User, DeviceSession, SubscriptionPlan, AdminMetrics, NotificationItem } from '../types';
export declare const MOCK_CHANNELS: Channel[];
export declare const MOCK_CONTENT: ContentItem[];
export declare const MOCK_CONTINUE_WATCHING: ContinueWatchingItem[];
export declare const MOCK_ADMIN_METRICS: AdminMetrics;
export declare const MOCK_USERS: User[];
export declare const MOCK_DEVICES: DeviceSession[];
export declare const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[];
export declare const MOCK_NOTIFICATIONS: NotificationItem[];
export declare const MOCK_ACTIVATION_CODES: ({
    id: string;
    code: string;
    deviceType: string;
    deviceName: string;
    ipAddress: string;
    generatedAt: string;
    expiresAt: string;
    status: string;
    userId?: undefined;
    userName?: undefined;
} | {
    id: string;
    code: string;
    deviceType: string;
    deviceName: string;
    ipAddress: string;
    generatedAt: string;
    expiresAt: string;
    status: string;
    userId: string;
    userName: string;
})[];
export declare const MOCK_ROLE_PERMISSIONS: {
    id: string;
    roleName: string;
    description: string;
    usersCount: number;
    permissions: {
        manageVod: boolean;
        manageLiveChannels: boolean;
        manageEpg: boolean;
        manageUsers: boolean;
        manageDevices: boolean;
        manageBilling: boolean;
        broadcastNotifications: boolean;
        systemSettings: boolean;
    };
}[];
