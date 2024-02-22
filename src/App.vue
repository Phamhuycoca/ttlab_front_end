<template>
  <div>
    <v-app>
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
    <Loading />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Loading from './common/Element/Loading.vue';
</script>
