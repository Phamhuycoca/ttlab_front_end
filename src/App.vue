<template>
  <div>
    <v-app>
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
    <loading />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import loading from '../src/common/Element/Loading.vue'
</script>
