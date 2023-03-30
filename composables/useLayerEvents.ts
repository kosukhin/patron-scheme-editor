import { watch } from '@vue/runtime-core'
import { shallowReactive } from '@vue/reactivity'
import { KonvaEventObject } from 'konva/lib/Node'
import { createSharedComposable } from '@vueuse/core'
import { Maybe, Nullable } from '~/entities'
import { useLayer } from '~/composables'

type KonvaEvent = Nullable<KonvaEventObject<any>>

export const useLayerEvents = createSharedComposable(() => {
  const { layer, stage } = useLayer()
  const dragend = shallowReactive(Maybe<KonvaEvent>())
  const dragstart = shallowReactive(Maybe<KonvaEvent>())
  const click = shallowReactive(Maybe<KonvaEvent>())
  const tap = shallowReactive(Maybe<KonvaEvent>())
  const mouseenter = shallowReactive(Maybe<KonvaEvent>())
  const mouseleave = shallowReactive(Maybe<KonvaEvent>())
  const wheel = shallowReactive(Maybe<KonvaEventObject<WheelEvent>>())
  const transformend = shallowReactive(Maybe<KonvaEvent>())

  watch(layer, () => {
    layer.map((vLayer) => {
      vLayer.on('dragend', (e) => {
        dragend.value = e
      })

      vLayer.on('dragstart', (e) => {
        dragstart.value = e
      })

      vLayer.on('click', (e) => {
        click.value = e
      })

      vLayer.on('tap', (e) => {
        tap.value = e
      })

      vLayer.on('mouseenter', (e) => {
        mouseenter.value = e
      })

      vLayer.on('mouseleave', (e) => {
        mouseleave.value = e
      })

      vLayer.on('transformend', (e) => {
        transformend.value = e
      })
    })

    stage.map((vStage) => {
      vStage.on('wheel', (e) => {
        wheel.value = e
      })
    })
  })

  return {
    dragend,
    dragstart,
    click,
    tap,
    mouseenter,
    mouseleave,
    wheel,
    transformend,
  }
})
