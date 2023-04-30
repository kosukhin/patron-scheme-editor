import { watchOnce } from '@vueuse/core'
import { computed } from '@vue/reactivity'
import {
  useMap,
  useLayer,
  useLocks,
  useMapPartialRenderer,
} from '~/composables'
import { all } from '~/utils'
import { renderMapObjects } from '~/application'

export const useMapRenderer = () => {
  const { triggerPartialRendering } = useMapPartialRenderer()
  const { layer, layerObjects } = useLayer()
  const { map } = useMap()
  const { maybeDragLocked } = useLocks()
  const allInit = computed(
    () => all([layer, map] as const).map(() => true).value
  )

  watchOnce(allInit, () => {
    all([layer, map, maybeDragLocked] as const)
      .map(renderMapObjects)
      .map((dispatch) => {
        dispatch((vObjects) => {
          vObjects.forEach(([objectId, objects]) => {
            layerObjects.set(objectId, objects)
          })
        })
      })

    setTimeout(() => {
      triggerPartialRendering()
    }, 1000)
  })

  return {
    map,
    allInit,
  }
}
