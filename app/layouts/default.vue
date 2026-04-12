<template>
  <div class="min-h-screen flex flex-col w-full selection:bg-zinc-800">
    <AppHeader />
    <main class="flex-grow w-full">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
