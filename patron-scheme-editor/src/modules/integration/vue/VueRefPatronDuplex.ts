import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { GuestObjectType } from 'patron-oop';
// @ts-ignore
import { watch } from 'vue';

export class VueRefPatronDuplex<T> implements GuestObjectType<T> {
  public constructor(
    private basePatron: VueRefPatron<T>,
    private guest: GuestObjectType<T>,
    private refWatcherCreated = false,
  ) { }

  public ref() {
    return this.basePatron.ref();
  }

  public get value() {
    return this.basePatron.value;
  }

  public introduction() {
    return this.basePatron.introduction();
  }

  public give(value: T): this {
    this.basePatron.give(value);
    if (!this.refWatcherCreated) {
      this.refWatcherCreated = true;
      watch(
        this.basePatron.ref(),
        (newValue: any) => {
          if (newValue) {
            this.guest.give(newValue);
          }
        },
        {
          deep: true,
        },
      );
    }
    return this;
  }
}
