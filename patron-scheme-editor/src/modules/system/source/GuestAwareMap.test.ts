import { GuestAwareMap } from "@/modules/system/source/GuestAwareMap";
import { Factory, give, GuestAwareType, GuestCast, GuestType, Source } from "patron-oop";
import { expect, test } from "vitest";

class X2 implements GuestAwareType<number> {
  public constructor(private baseNumber: GuestAwareType<number>) { }

  public value(guest: GuestType<number>) {
    this.baseNumber.value(
      new GuestCast(<GuestType>guest, (v) => {
        give(v * 2, guest);
      })
    )
    return this;
  }
}

test('GuestAwareMap.test', () => {
  const source = new Source([1, 2, 3, 9])
  const guestMapped = new GuestAwareMap(
    source,
    new Factory(X2)
  );
  expect(true).toBe(true);
  guestMapped.value((v) => {
    expect(v.join()).toBe('2,4,6,18')
  });
});
