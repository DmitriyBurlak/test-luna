<script setup lang="ts">
import { FooterWidget } from '~/widgets/footer'
</script>

<template>
  <div>
    <UMain>
      <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <FooterWidget />
  </div>
</template>
