<script setup lang="ts">
const props = withDefaults(defineProps<{
  open: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
}>(), {
  confirmText: 'Удалить',
  cancelText: 'Отмена'
})

const isOpen = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  (e: 'cancel' | 'confirm'): void
}>()

function onConfirm() {
  emit('confirm')
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="props.title"
    :description="props.description"
    :ui="{
      header: 'max-w-[92%] text-lg p-6!',
      content: 'max-w-130 rounded-2xl',
      title: 'font-bold',
      footer: 'p-4! border-t border-solid'
    }"
    :close="{
      color: 'neutral',
      variant: 'outline',
      size: 'md',
      class: 'p-2 !top-4 !end-4 rounded-full'
    }"
    :dismissible="false"
  >
    <template #footer="{ close }">
      <UButton
        :label="props.cancelText"
        variant="outline"
        color="neutral"
        class="text-text font-medium text-lg"
        block
        @click="close"
      />
      <UButton
        :label="props.confirmText"
        color="error"
        class="font-medium text-lg"
        variant="solid"
        block
        @click="onConfirm"
      />
    </template>
  </UModal>
</template>
