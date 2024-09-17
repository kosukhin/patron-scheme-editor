import { MapFileOfContent } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileOfContent';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettingsGuest';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import {
  MapObjectsRects,
} from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRects';
import { MapObjectGuest } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectGuest';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { useFactories } from '@/composables/useFactories';
import {
  MapObjectsArrows,
} from '@/modules/application/l1/l2/visualisation/arrows/MapObjectsArrows';

const factories = useFactories();

const notification = new Notification(factories);
const mapFile = new MapFileOfContent(
  new FileSystemContent(
    new BrowserLaunchQueue(),
    notification,
    factories,
  ),
  factories,
);
const mapCurrent = new MapCurrent(mapFile, factories);
const mapSettings = new MapSettingsGuest(mapFile, mapCurrent, factories);
const canvas = new BrowserCanvas(factories);
const konvaLayer = new KonvaLayer(canvas, factories);
const mapObject = new MapObjectGuest(mapCurrent, mapFile, factories);
const mapObjectsVisible = new MapObjectsVisible(konvaLayer, canvas, mapCurrent, factories);
mapObjectsVisible.objects(new MapObjectsRects(konvaLayer, mapObject, factories));
mapObjectsVisible.objects(new MapObjectsArrows(konvaLayer, mapFile, factories));
const miniMap = new MiniMap(mapCurrent, konvaLayer, factories);

export const useApplication = () => ({
  mapFile,
  mapCurrent,
  mapSettings,
  mapObjects: mapObjectsVisible,
  canvas,
  miniMap,
  notification,
});
