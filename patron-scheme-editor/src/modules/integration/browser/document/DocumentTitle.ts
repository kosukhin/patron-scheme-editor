import { GuestAwareObjectType, GuestObjectType } from 'patron-oop';

export class DocumentTitle implements GuestObjectType<string> {
  public constructor(title: GuestAwareObjectType<string>) {
    title.value(this);
  }

  public give(value: string): this {
    document.title = value;
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
