import { StageMoveRestrictionType } from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { KonvaPointDocument } from '@/modules/integration/konva/KonvaPointDocument';
import { KonvaLayer as KonvaLayerType } from '@/modules/integration/konva/KonvaTypes';
import { debug } from 'debug';
import Konva from 'konva';
import {
  FactoryType,
  GuestAwareAllType,
  GuestAwareObjectType,
  GuestObjectType,
  GuestValueType,
  SourceType
} from 'patron-oop';

const localDebug = debug('app:konva:KonvaLayer');

export class KonvaLayer implements LayerBase {
  private guestChain: GuestAwareAllType<{ canvas: HTMLElement }>;

  private positionCache: SourceType<KonvaPointDocument>;

  private layerCache: SourceType<KonvaLayerType>;

  public constructor(
    private canvasDep: BrowserCanvasType,
    stageSizeDep: GuestAwareObjectType<SizeDocument>,
    private stageMoveRestriction: StageMoveRestrictionType,
    private factories: {
      chain: FactoryType<GuestAwareAllType<{ canvas: HTMLElement }>>;
      cache: FactoryType<SourceType>;
      sourceEmpty: FactoryType<SourceType>;
      guest: FactoryType<GuestObjectType>;
      patron: FactoryType<GuestObjectType>;
      guestSync: FactoryType<GuestValueType>;
    },
  ) {
    this.positionCache = factories.cache.create({
      x: 0,
      y: 0,
    });
    this.guestChain = factories.chain.create();
    this.layerCache = factories.sourceEmpty.create();
    this.canvasDep.canvas(factories.patron.create(this.guestChain.guestKey('canvas')));
    stageSizeDep.value(this.guestChain.guestKey('stageSize'));

    this.guestChain.value(
      factories.guest.create<[(props: { canvas: HTMLElement; stageSize: SizeDocument }) => void]>(
        ({ canvas }) => {
          localDebug('create new konva stage');
          const stage = new Konva.Stage({
            width: canvas.clientWidth,
            height: canvas.clientHeight,
            container: canvas as HTMLDivElement,
            fill: '#ffeeee',
            draggable: true,
          });
          const layer = new Konva.Layer() as unknown as KonvaLayerType;
          stage.add(layer);
          layer.draw();
          this.layerCache.give(layer);

          stage.on('dragend', (e) => {
            if (!(e.target instanceof Konva.Stage)) {
              return;
            }
            const position = {
              x: stage.x(),
              y: stage.y(),
            };
            localDebug('new position', position);
            this.positionCache.give(position);
          });

          stage.on('dragmove', (e) => {
            if (!(e.target instanceof Konva.Stage)) {
              return;
            }
            const position = {
              x: stage.x(),
              y: stage.y(),
            };
            this.positionCache.give(position);
          });

          const posGuest = this.factories.guestSync.create({
            x: 0,
            y: 0,
          });
          stage.dragBoundFunc((pos) => {
            stageMoveRestriction.position(pos, posGuest);
            return posGuest.value() as PointDocument;
          });
        },
      ),
    );
  }

  public layer<R extends GuestObjectType<KonvaLayerType>>(guest: R) {
    this.layerCache.value(guest);
    return guest;
  }

  public position<R extends GuestObjectType<KonvaPointDocument>>(guest: R) {
    this.positionCache.value(guest);
    return guest;
  }

  public give(value: KonvaLayerType): this {
    this.layerCache.give(value);
    const stage = value.getStage();
    this.positionCache.give({
      x: stage.x(),
      y: stage.y(),
    });
    return this;
  }
}
