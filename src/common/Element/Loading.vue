<template>
    <v-overlay :model-value="useLoading.loading" class="align-center justify-center" persistent>
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts" setup>
import { useLoadingStore } from '../../stores/Loading'
const useLoading = useLoadingStore();
</script>

<style scoped>
.loader {
    width: fit-content;
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    background: radial-gradient(circle closest-side, #000 94%, #0000) right/calc(200% - 1em) 100%;
    animation: l24 1s infinite alternate linear;
}

.loader::before {
    content: "Loading...";
    line-height: 1em;
    color: #0000;
    background: inherit;
    background-image: radial-gradient(circle closest-side, #fff 94%, #000);
    -webkit-background-clip: text;
    background-clip: text;
}

@keyframes l24 {
    100% {
        background-position: left;
    }
}
</style>