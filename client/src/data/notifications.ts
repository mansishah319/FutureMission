export type NotificationType = 'game' | 'report' | 'system';

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  isRead: boolean;
  time: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Game Request',
    description: 'A new cyber drill game requires approval.',
    type: 'game',
    isRead: false,
    time: '2 min ago',
  },
  {
    id: '2',
    title: 'Report Ready',
    description: 'Final after-action report is available.',
    type: 'report',
    isRead: false,
    time: '1 hour ago',
  },
  {
    id: '3',
    title: 'System Update',
    description: 'Leaderboard scoring updated.',
    type: 'system',
    isRead: true,
    time: 'Yesterday',
  },
];
