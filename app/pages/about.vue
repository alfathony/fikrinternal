<template>
  <div class="container px-6 md:px-12 py-12 mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Content -->
      <div class="order-2 lg:order-1">
        <h1 class="text-4xl md:text-6xl font-light tracking-wide text-zinc-100 mb-8 uppercase">
          <span class="text-primary italic font-serif lowercase">fikrinternal</span>
        </h1>
        
        <div class="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed tracking-wide font-light">
          <p>
            FIKRINTERNAL is more than just a lens; it's a front-row seat to the pulse of live music. Founded on the belief that every performance has a heartbeat, we specialize in capturing the raw, unscripted energy of the stage.
          </p>
          <p>
            From the intensity of a lead singer's focus to the explosive lights of a sold-out arena, our photography seeks to freeze the rhythm and preserve the atmosphere that only live music can create.
          </p>
          <p>
            Based in the heart of the music scene, we work with artists and venues to document the moments that define a performance. Our vision is to ensure that while the music may fade, the memory remains vivid, sharp, and immortalized in every frame.
          </p>
        </div>

        <div class="mt-12">
          <NuxtLink to="https://www.instagram.com/fikrinternal/" target="_blank" class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-zinc-100 border-b border-primary pb-1 hover:text-primary transition-colors duration-300 uppercase">
            FOLLOW THE JOURNEY
          </NuxtLink>
        </div>
      </div>

      <!-- Image -->
      <div class="order-1 lg:order-2 relative group overflow-hidden rounded-2xl">
        <NuxtImg 
          src="/assets/images/about_hero.png" 
          alt="Photographer at work" 
          class="w-full h-auto object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
        />
        <div class="absolute inset-0 border border-zinc-100/10 rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About | FIKRINTERNAL',
  meta: [
    { name: 'description', content: 'Learn more about FIKRINTERNAL and our passion for music stage photography.' }
  ]
})
</script>
