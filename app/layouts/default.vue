<script setup lang="ts">
import { HeaderWidget } from '~/widgets/header'
import { FooterWidget } from '~/widgets/footer'
</script>

<template>
  <div>
    <HeaderWidget />

    <UMain>
      <slot />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <FooterWidget />
  </div>
</template>
