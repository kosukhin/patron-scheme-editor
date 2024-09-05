import { GuestType } from '@/modules/system/guest/GuestType';

export interface ChainType<T> {
  result(guest: GuestType<T>);
  receiveKey<R>(key: string): GuestType<R>;
}