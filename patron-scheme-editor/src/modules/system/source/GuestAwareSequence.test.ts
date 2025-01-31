import { GuestAwareSequence } from "@/modules/system/source/GuestAwareSequence";
import { Factory, give, GuestAwareObjectType, GuestCast, GuestType, Source } from "patron-oop";
import { expect, test } from "vitest";

class X2 implements GuestAwareObjectType<number> {
  public constructor(private baseNumber: GuestAwareObjectType<number>) { }

  public value(guest: GuestType<number>) {
    this.baseNumber.value(
      new GuestCast(<GuestType>guest, (v) => {
        give(v * 2, guest);
      })
    )
    return this;
  }
}

test('GuestAwareSequence.test', () => {
  const source = new Source([1, 2, 3, 9])
  const guestMapped = new GuestAwareSequence(
    source,
    new Factory(X2)
  );
  expect(true).toBe(true);
  guestMapped.value((v) => {
    expect(v.join()).toBe('2,4,6,18')
  });
})
