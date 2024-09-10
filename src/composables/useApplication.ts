import { MapFileOfContent } from '@/modules/application/map/mapFile/MapFileOfContent';
import { MapFileContentFS } from '@/modules/application/fileSystem/mapFileContent/MapFileContentFS';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/map/mapCurrent/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/map/mapSettings/MapSettingsGuest';
import { Notification } from '@/modules/application/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/visualisation/visibleObjects/MapObjectsVisible';
import { MapObjectsRectsPatron } from '@/modules/application/visualisation/rects/MapObjectsRectsPatron';
import { MapObjectGuest } from '@/modules/application/map/mapObject/MapObjectGuest';
import { MiniMap } from '@/modules/application/visualisation/miniMap/MiniMap';
import { Factory } from '@/modules/system/guest/Factory';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';

const fileHandlerReadFactory = new Factory((value: FileSystemFileHandle) => new SystemFileFromHandler(value));
const browserFileSavedFactory = new Factory((value: FileSystemFileHandle) => new BrowserFileSaved(value));
const notification = new Notification();
const mapFile = new MapFileOfContent(new MapFileContentFS(
  new BrowserLaunchQueue(),
  notification,
  fileHandlerReadFactory,
  browserFileSavedFactory,
));
const mapCurrent = new MapCurrent(mapFile);
const mapSettings = new MapSettingsGuest(mapFile, mapCurrent);
const canvas = new BrowserCanvas();
const konvaLayer = new KonvaLayer(mapFile, canvas);
const mapObject = new MapObjectGuest(mapCurrent, mapFile);
const mapObjects = new MapObjectsVisible(konvaLayer, canvas, mapCurrent);
mapObjects.objects(new MapObjectsRectsPatron(konvaLayer, mapObject));
const miniMap = new MiniMap(mapCurrent, konvaLayer);

export const useApplication = () => ({
  mapFile,
  mapCurrent,
  mapSettings,
  mapObjects,
  canvas,
  miniMap,
  notification,
});
