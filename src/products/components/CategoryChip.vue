<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-chip :class="state ? 'inset-shadow' : ''" :outline="!state" v-model:selected="state" color="primary" text-color="white">
    {{code}}
  </q-chip>
</template>

<script setup lang="ts">
  const props = defineProps({
    state: Boolean,
    code: String
  })
  // defineProps<{
  //   state?: boolean
  //   code?: string
  // }>()
</script>
