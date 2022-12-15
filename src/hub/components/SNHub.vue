<template>
  <div>
    <q-btn round padding="8px" :icon="icon" color="primary" size="1.5em" :href="url" target="_blank" >
    </q-btn>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
	icon: String,
	url: String
})
</script>
