import { NotificationType, NotificationDocument } from '@/modules/application/notification/NotificationType';
import { Cache } from '@/modules/system/guest/Cache';
import { GuestType } from '../../system/guest/GuestType';

export class Notification implements NotificationType {
  public constructor(
    private notificationLifetimeDelay = 4000,
    private messageDocument = new Cache<NotificationDocument>(this),
    private lastTimerHead: NodeJS.Timeout | null = null,
  ) {}

  public message(guest: GuestType<NotificationDocument>): this {
    this.messageDocument.receiving(guest);
    return this;
  }

  public receive(value: NotificationDocument): this {
    this.messageDocument.receive(value);
    if (this.lastTimerHead) {
      clearTimeout(this.lastTimerHead);
    }
    this.lastTimerHead = setTimeout(() => {
      this.messageDocument.receive({
        type: 'success',
        text: 'hide',
      });
    }, this.notificationLifetimeDelay);
    return this;
  }
}
