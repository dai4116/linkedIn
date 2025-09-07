import { onMounted, onBeforeUnmount, unref } from 'vue'
import type { Ref } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, handler: (e: Event) => void) {
  const onDoc = (e: Event) => {
    const el = unref(target)
    if (!el) return
    const t = e.target as Node | null
    if (t && !el.contains(t)) handler(e)
  }
  onMounted(() => {
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('touchstart', onDoc, { passive: true })
  })
  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', onDoc)
    document.removeEventListener('touchstart', onDoc)
  })
}
