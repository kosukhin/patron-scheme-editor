import { MapStructure } from '@/entities/Map';
import { Valueable } from '@/modules/eo/targets/system/Valueable';

export class MapWithValueField implements Valueable<MapStructure> {
  constructor(
    private baseMap: Valueable<MapStructure>,
    private dictionaryKey: keyof MapStructure,
    private dictionaryValue: unknown,
  ) {}

  value(): MapStructure {
    const structure = this.baseMap.value();

    return {
      ...structure,
      [this.dictionaryKey]: this.dictionaryValue,
    };
  }
}
