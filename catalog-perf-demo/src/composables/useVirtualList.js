import { ref, computed } from 'vue'
export function useVirtualList(itemsRef, {
  rowHeight = 56,
  viewportHeight = 560,
  overscan = 6
} = {}) {
  const scrollTop = ref(0)
  const start = computed(() => Math.floor(scrollTop.value / rowHeight))
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan
  const end = computed(() => start.value + visibleCount)
  const offset = computed(() => start.value * rowHeight)
  const slice = computed(() => itemsRef.value.slice(start.value, end.value))
  return { scrollTop, start, end, offset, slice, rowHeight, viewportHeight }
}
