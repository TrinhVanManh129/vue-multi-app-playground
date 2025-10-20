import { ref, onMounted, onUnmounted } from 'vue'

export function useLazyImage(imageRef) {
  const isLoaded = ref(false)
  const isInView = ref(false)
  let observer = null
  onMounted(() => {
    if (!imageRef.value) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isInView.value = true
            if (observer) {
              observer.disconnect()
            }
          }
        })
      },
      { rootMargin: '50px' }
    )
    observer.observe(imageRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  const handleLoad = () => {
    isLoaded.value = true
  }

  return {
    isLoaded,
    isInView,
    handleLoad
  }
}
