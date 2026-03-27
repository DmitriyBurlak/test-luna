<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() =>
  route.params.id === 'new' ? 'Создание заметки' : 'Редактирование заметки'
)
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <h1 class="text-xl font-semibold">
          {{ pageTitle }}
        </h1>
      </template>

      <p class="text-sm text-muted">
        -
      </p>
    </UCard>
  </div>
</template>
