<template>
  <div class="px-6 md:px-12 py-12">
    <!-- Hero / Title Section -->
    <div class="mb-16 max-w-3xl">
      <h1 class="text-4xl md:text-6xl font-light tracking-wide text-zinc-100 mb-6">
        Capturing Moments <br>
        <span class="text-primary italic font-serif">Brilliantly.</span>
      </h1>
      <p class="text-zinc-400 text-sm md:text-base leading-relaxed tracking-wide">
        Explore a curated collection of high-quality professional photography. Every image is optimized for rapid loading without compromising on quality using the power of Nuxt Image.
      </p>
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
      <div v-for="photo in photos" :key="photo.id" class="break-inside-avoid relative group overflow-hidden rounded-lg bg-zinc-900 border border-zinc-900/50">
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
</script>
