<template>
  <q-layout view="hHh lpR fFf">
    <q-footer reveal class="bg-transparent text-secondary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" v-model="tab">
        <q-route-tab class="first-border bg-grey-2" name="home" color="primary" icon="fa-solid fa-house" label="Home" to="/"/>
        <q-route-tab class="bg-grey-2" name="products" color="primary" icon="fa-solid fa-bullseye" label="Products" to="/products"/>
        <q-route-tab class="bg-grey-2" name="contact" color="primary" icon="fa-solid fa-store" label="Contact" to="/contact"/>
        <q-route-tab class="last-border bg-grey-2" name="points" color="primary" icon="fa-solid fa-gem" label="Points" to="/"/>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('mails')
</script>
