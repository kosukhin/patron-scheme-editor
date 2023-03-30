import { reactive } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { allSet, MapObject, Maybe } from '~/entities'
import { useCurrentMap } from '~/composables/useCurrentMap'

export const useMapObjects = createSharedComposable(() => {
  const { map } = useCurrentMap()
  const currentObjectId = reactive(Maybe<number>())
  const currentObject = reactive(Maybe<MapObject>())

  watch([currentObjectId, map], () => {
    allSet([currentObjectId, map] as const).map(([objId, vMap]) => {
      currentObject.value = vMap.objects[objId]
    })
  })

  return {
    currentObjectId,
    currentObject,
  }
})
