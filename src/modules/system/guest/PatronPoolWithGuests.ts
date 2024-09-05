import { PatronPool } from '@/modules/system/guest/PatronPool';
import { PoolType } from '@/modules/system/guest/PoolType';
import {
  GuestType,
  ReceiveOptions,
} from './GuestType';

export class PatronPoolWithGuests<T> implements GuestType<T>, PoolType<T> {
  private guests = new Set<GuestType<T>>();

  private patronPool: PatronPool<T>;

  public constructor(initiator: unknown) {
    this.patronPool = new PatronPool(initiator);
  }

  public receive(value: T, options?: ReceiveOptions): this {
    this.deliverToGuests(value, options);
    this.patronPool.receive(value, options);
    return this;
  }

  public add(guest: GuestType<T>): this {
    if (!guest.introduction || guest.introduction() === 'guest') {
      this.guests.add(guest);
    }
    this.patronPool.add(guest);
    return this;
  }

  public distributeReceiving(receiving: T, ...guests: GuestType<T>[]): this {
    guests.forEach((guest) => {
      this.guests.add(guest);
    });
    this.deliverToGuests(receiving);
    this.patronPool.distributeReceiving(receiving, ...guests);
    return this;
  }

  private deliverToGuests(value: T, options?: ReceiveOptions) {
    this.guests.forEach((target) => {
      target.receive(value, options);
    });
    this.guests.clear();
  }
}