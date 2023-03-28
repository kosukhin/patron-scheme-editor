import {useRoute} from "vue-router";
import {createSharedComposable} from "@vueuse/core";
import {getMap, saveMap} from "~/requests";
import {MapStructure, MaybeError} from "~/entities";
import {reactive, ref} from "@vue/reactivity";
import {watch} from "@vue/runtime-core";
import {useNotify} from "~/composables";
import {MAP_UPDATED} from "~/constants";

export const useCurrentMap = createSharedComposable(() => {
  const {message} = useNotify();
  const firstMapLoad = ref(false);
  const map = reactive(MaybeError<MapStructure>())
  const route = useRoute();
  const mapName = route.path.replace('/', '');

  getMap(mapName).then(m => {
    map.value = m;
    firstMapLoad.value = true;
  }).catch(e => {map.error = e})

  watch(map, () => {
    map.map(vMap => {
      saveMap({...vMap, url: location.pathname}, mapName)
        .then(() => {
          message.value = MAP_UPDATED;
        })
        .catch((e) => {
          map.error = String(e);
          message.value = map.error;
        })
    });
  }, {
    deep: true
  })

  return {
    map,
    firstMapLoad,
    mapName,
  }
});
