import { onMounted, onBeforeUnmount } from 'vue'

export function useEscapeKey(handler: (e: KeyboardEvent) => void) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handler(e)
  }
  onMounted(() => document.addEventListener('keydown', onKey))
  onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
}

