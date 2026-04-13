<template>
  <header class="w-full h-24 flex items-center justify-between px-6 md:px-12 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
    <div class="flex items-center">
      <!-- Logo Placeholder: Replace the contents of this div with your actual <img> tag when ready -->
      <NuxtLink to="/" class="flex flex-col transition-transform hover:scale-105">
        <img src="/assets/images/logo.png" alt="FIKRINTERNAL" class="h-8 md:h-10 object-contain drop-shadow-md" />
      </NuxtLink>
    </div>
    
    <nav class="hidden md:flex items-center gap-8 text-xs font-semibold tracking-[0.2em] text-zinc-400">
      <NuxtLink to="/" class="hover:text-primary transition-colors duration-300">HOME</NuxtLink>
      <NuxtLink to="/about" class="hover:text-primary transition-colors duration-300">ABOUT US</NuxtLink>
      <NuxtLink to="https://www.instagram.com/fikrinternal/" target="_blank" class="hover:text-primary transition-colors duration-300">INSTAGRAM</NuxtLink>
    </nav>
  </header>
</template>
