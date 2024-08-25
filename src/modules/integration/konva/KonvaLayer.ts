import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from '@/modules/system/guest/Guest';
import Konva from 'konva';
import { Visitant } from '@/modules/system/guest/Visitant';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { Patron } from '@/modules/system/guest/Patron';
import { MapDocument } from '@/modules/entities/MapStructures';
import { Layer } from 'konva/lib/Layer';
import { LayerBase } from '@/modules/application/layer/LayerBase';

export class KonvaLayer implements LayerBase {
  private guestChain = new GuestChain<{canvas: HTMLElement, map: MapDocument}>();

  public constructor(private mapFile: MapFile, private canvas: BrowserCanvas) {
    this.canvas.canvas(new Patron(this.guestChain.receiveKey('canvas')));
    this.mapFile.currentMap(new Patron(this.guestChain.receiveKey('map')));
  }

  public layer(guest: Guest<Layer>): this {
    this.guestChain.result(new Visitant(({ canvas, map }) => {
      const stage = new Konva.Stage({
        width: 900,
        height: 400,
        container: canvas as HTMLDivElement,
        fill: '#ffeeee',
        draggable: true,
      });
      const layer = new Konva.Layer();
      stage.add(layer);
      layer.draw();
      guest.receive(layer);
    }));
    return this;
  }
}
