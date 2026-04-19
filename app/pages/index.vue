<template>
  <div class="px-6 md:px-12 py-12">
    <!-- Hero / Title Section -->
    <div class="mb-0 max-w-3xl">
      <h1 class="text-4xl md:text-6xl font-light tracking-wide text-zinc-100 mb-6 hidden">
        FIKRINTERNAL <br>
        
      </h1>
      
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="aspect-[3/4] bg-zinc-900 animate-pulse rounded-lg border border-zinc-800"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-900/20 border border-red-900/50 p-6 rounded-lg text-red-200">
      <p class="text-sm tracking-wide">Failed to load gallery content. Please try again later.</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!photos || photos.length === 0" class="text-zinc-500 py-24 text-center border-2 border-dashed border-zinc-800 rounded-xl">
      <p class="text-sm tracking-widest uppercase mb-2 font-medium">Portfolio is currently empty</p>
      <p class="text-xs text-zinc-600">Add some photos to your Supabase 'gallery' table to see them here.</p>
    </div>

    <!-- Gallery Grid -->
    <div v-else class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      <div 
        v-for="(photo, index) in photos" 
        :key="photo.id" 
        @click="openLightbox(index)"
        class="break-inside-avoid relative group overflow-hidden rounded-lg bg-zinc-900 border border-zinc-900/50 cursor-zoom-in"
      >
        <!-- NuxtImg handles lazy loading and format optimization natively -->
        <NuxtImg
          :src="photo.src"
          :alt="photo.title"
          loading="lazy"
          placeholder
          format="webp"
          quality="80"
          widths="400,800,1200"
          class="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
          <p class="text-zinc-100 text-xs tracking-[0.15em] font-medium uppercase">{{ photo.title }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl" @click="closeLightbox"></div>
          
          <!-- Close Button -->
          <button 
            @click="closeLightbox"
            class="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors p-2 z-10"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Navigation -->
          <button 
            @click="prevPhoto"
            class="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-4 hidden md:block z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            @click="nextPhoto"
            class="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-4 hidden md:block z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Content Container -->
          <div class="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
            <!-- Loading Spinner -->
            <div v-if="isImageLoading" class="absolute inset-0 flex items-center justify-center z-20">
              <div class="w-10 h-10 border-[3px] border-zinc-800 border-t-primary rounded-full animate-spin"></div>
            </div>

            <div 
              class="relative max-w-full max-h-[85vh] group pointer-events-auto transition-all duration-500"
              :class="isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
            >
              <NuxtImg
                :src="photos[selectedIndex].src"
                :alt="photos[selectedIndex].title"
                format="webp"
                quality="90"
                @load="isImageLoading = false"
                class="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
              />
              
              <!-- Info Overlay -->
              <div class="absolute -bottom-16 left-0 right-0 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 class="text-zinc-100 text-sm md:text-base font-light tracking-[0.2em] uppercase">
                  {{ photos[selectedIndex].title }}
                </h2>
                <p class="text-zinc-500 text-[10px] tracking-[0.3em] mt-2">
                  {{ selectedIndex + 1 }} / {{ photos.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const { data: photos, error, pending } = await useAsyncData('gallery', async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('id, title, url')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  
  // Mapping 'url' field from DB to 'src' for the template
  return data.map(item => ({
    ...item,
    src: item.url
  }))
})

// Lightbox Logic
const selectedIndex = ref(null)
const isLightboxOpen = computed(() => selectedIndex.value !== null)
const isImageLoading = ref(false)

const openLightbox = (index) => {
  isImageLoading.value = true
  selectedIndex.value = index
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedIndex.value = null
  document.body.style.overflow = ''
  isImageLoading.value = false
}

const nextPhoto = () => {
  if (photos.value && photos.value.length > 0) {
    isImageLoading.value = true
    selectedIndex.value = (selectedIndex.value + 1) % photos.value.length
  }
}

const prevPhoto = () => {
  if (photos.value && photos.value.length > 0) {
    isImageLoading.value = true
    selectedIndex.value = (selectedIndex.value - 1 + photos.value.length) % photos.value.length
  }
}

const handleKeydown = (e) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextPhoto()
  if (e.key === 'ArrowLeft') prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
