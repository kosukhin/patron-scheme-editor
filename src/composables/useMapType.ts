import { ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { useMap } from '@/composables/useMap';
import { MapTypeStructure } from '@/objects/entities/MapStructures';
import { setValue } from '@/utils/common';

type StrNum = string | number

export const useMapType = createSharedComposable(() => {
  const { map } = useMap();
  const currentTypeId = ref<StrNum>();
  const currentType = ref<MapTypeStructure>();
  watch(currentTypeId, () => {
    if (map.value && currentTypeId.value) {
      setValue(currentType, map.value.types[currentTypeId.value]);
    }
  });

  return {
    currentTypeId,
    currentType,
  };
});
