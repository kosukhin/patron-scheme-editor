import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { KonvaLayer } from '@/modules/integration/konva/KonvaTypes';
import { debug } from 'debug';
import { FactoryType, GuestAwareAllType, GuestAwareObjectType, GuestObjectType } from 'patron-oop';

type ObjectsConfig = {
  axis: 'x' | 'y';
  direction: 'positive' | 'negative';
};

export type CountDocument = {
  count: number;
  nearestObjectId: string;
};

type ChainDocument = {
  position: PointDocument;
  layer: KonvaLayer;
  objects: MapObjectDocument[];
};

const axisToSize = {
  x: 'width',
  y: 'height',
} as const;

const axisToPositionIndex = {
  x: 0,
  y: 1,
};

const directionMultiplier = {
  positive: 1,
  negative: -1,
};

const localDebug = debug('ObjectsOutsideScreen');

export class ObjectsOutsideScreen {
  public constructor(
    private map: MapType,
    private stageSize: GuestAwareObjectType<SizeDocument>,
    private layer: LayerBase,
    private factories: {
      chain: FactoryType<GuestAwareAllType<unknown>>;
      guestCast: FactoryType<GuestObjectType>;
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) { }

  public count<R extends GuestObjectType<CountDocument>>(config: ObjectsConfig, guest: R) {
    const isPositiveDirection = config.direction === 'positive';
    const chain = this.factories.chain.create();
    this.map.objects(this.factories.guestCast.create(guest, chain.guestKey('objects')));
    this.layer.layer(this.factories.guestCast.create(guest, chain.guestKey('layer')));
    this.layer.position(this.factories.guestCast.create(guest, chain.guestKey('position')));
    chain.value(
      this.factories.guestInTheMiddle.create(
        guest,
        ({ objects, layer, position }: ChainDocument) => {
          const multiplier = directionMultiplier[config.direction];
          const sortedObjects = objects.sort(
            (a, b) =>
              a.position[axisToPositionIndex[config.axis]] * multiplier -
              b.position[axisToPositionIndex[config.axis]] * multiplier,
          );
          const nearest = sortedObjects.filter((object) => {
            const objectPoint =
              object.position[axisToPositionIndex[config.axis]] +
              (isPositiveDirection ? 0 : object[axisToSize[config.axis]]);
            const screenPoint =
              position[config.axis] * -1 +
              (isPositiveDirection ? layer[axisToSize[config.axis]]() : 0);

            localDebug(
              'mb nearest points',
              config.direction,
              'objectP=',
              objectPoint,
              'screenP=',
              screenPoint,
            );

            return isPositiveDirection ? objectPoint > screenPoint : objectPoint < screenPoint;
          });
          localDebug('nearest', nearest);
          guest.give({
            count: nearest.length,
            nearestObjectId: nearest.at(isPositiveDirection ? -1 : 0)?.id ?? '',
          });
        },
      ),
    );

    return guest;
  }
}
