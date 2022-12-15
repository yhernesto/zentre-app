<template>
  <q-btn class="shadow-5" outline rounded push style="width:100%; background: transparent;"
    color="primary" :href="url" target="_blank" padding="xs"
  >
    <div class="col-3 justify-end">
      <q-icon left :name="icon"/>
    </div>
    <div class="col-6">
      <div class="row q-py-md justify-center">
        {{name}}
      </div>
    </div>
    <div class="col-3">
    </div>
  </q-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
	name: String,
  url: String,
})
</script>
