import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapTypeDocument, MapTypeWithNameDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import {
  CheckNotificationType,
} from '@/modules/application/l1/l2/l3/map/checks/CheckNotificationType';
import { ChainType } from '@/modules/system/guest/ChainType';

export class MapTypeRemoved implements GuestType<MapTypeDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private checks: CheckNotificationType<MapTypeWithNameDocument>[],
    private factories: {
      guest: FactoryType<GuestType>,
      chain: FactoryType<ChainType>
    },
  ) {}

  receive(value: MapTypeDocument): this {
    const checksChain = this.factories.chain.create(this);
    this.checks.forEach((check, index) => {
      check.breakOnFail({
        name: value.name,
        type: value,
      }, checksChain.receiveKey(String(index)));
    });

    checksChain.result(this.factories.guest.create(() => {
      this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
        delete latestMap.types[value.name];
        this.map.receive(latestMap);
      }));
    }));

    return this;
  }
}