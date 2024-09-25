import { Factory } from '@/modules/system/guest/Factory';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { Cache } from '@/modules/system/guest/Cache';
import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { TransformedToJSON } from '@/modules/system/transformed/TransformedToJSON';
import { Patron } from '@/modules/system/guest/Patron';
import { Chain } from '@/modules/system/guest/Chain';
import { PatronOnce } from '@/modules/system/guest/PatronOnce';
import { GuestCast } from '@/modules/system/guest/GuestCast';
import { SvgImage } from '@/modules/application/l1/l2/visualisation/svg/SvgImage';
import { FactoryDynamic } from '@/modules/system/guest/FactoryDynamic';
import {
  MapObjectDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { SvgMapTypeImage } from '@/modules/application/l1/l2/visualisation/svg/SvgMapTypeImage';
import { NumberChunks } from '@/modules/application/l1/l2/l3/number/NumberChunks';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { Source } from '@/modules/system/guest/Source';
import { MapObjectUrl } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectUrl';

const fileHandlerContent = new Factory(SystemFileFromHandler);
const browserFileSaved = new Factory(BrowserFileSaved);
const cache = new Factory(Cache);
const source = new Factory(Source);
const guest = new Factory(Guest);
const guestCast = new Factory(GuestCast);
const pool = new Factory(PatronPool);
const patron = new Factory(Patron);
const patronOnce = new Factory(PatronOnce);
const guestInTheMiddle = new Factory(GuestInTheMiddle);
const transformToString = new Factory(TransformedToJSON);
const transformToObject = new Factory(TransformedFromJSON);
const chain = new Factory(Chain);
const svgImage = new Factory(SvgImage);
const svgMapTypeImage = new FactoryDynamic(
  (mapType: MapTypeDocument) => new SvgMapTypeImage(mapType, { svgImage }),
);
const numberChunks = new FactoryDynamic((chunks: number, baseNumber: GuestAwareType<number>) => new NumberChunks(chunks, baseNumber, { guestInTheMiddle }));
const mapObjectUrl = new FactoryDynamic((objectSource: GuestAwareType<MapObjectDocument>) => new MapObjectUrl(objectSource, { guest, guestInTheMiddle }));

const factories = {
  cache,
  chain,
  guest,
  guestCast,
  guestInTheMiddle,
  patron,
  patronOnce,
  pool,
  source,

  fileHandlerContent,
  browserFileSaved,

  transformToString,
  transformToObject,

  svgImage,
  svgMapTypeImage,

  numberChunks,
  mapObjectUrl,
};

export const useFactories = () => factories;
