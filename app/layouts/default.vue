<script setup lang="ts">
import { FooterWidget } from '~/widgets/footer'
</script>

<template>
  <div>
    <UMain>
      <div class="app-layout">
        <slot />
      </div>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <FooterWidget />
  </div>
</template>
