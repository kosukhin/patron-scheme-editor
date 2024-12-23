import { ArrowType } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAware } from "patron-oop";
import { expect, test } from "vitest";

test('ArrowType.threeBreaks.test', () => {
  const deps = new GuestAware((guest) => {
    give({
      fromObject: {
        width: 100,
        height: 100,
        position: [0, 0]
      },
      toObject: {
        width: 100,
        height: 100,
        position: [200, 0]
      }
    }, guest)
  })
  const arrowType = new ArrowType(deps);

  arrowType.value((v) => {
    expect(v.type).toBe('threeBreaks');
  })
})
