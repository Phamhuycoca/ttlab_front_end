<template>
    <v-row justify="center">
        <v-dialog v-model="props.dialogremove" width="auto">
            <v-card>
                <v-card-title class="text-h5">Thông báo</v-card-title>
                <v-card-text>{{ props.message }}</v-card-text>
                <v-card-actions>
                    <v-btn color="red-darken-1" variant="text" @click="remove">Có</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="close">Không</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script lang="ts" setup>
const props = defineProps(['dialogremove', 'message']);
const emit = defineEmits();
const close = () => {
    emit('close');
}
const remove = () => {
    emit('Remove');
}
</script>

<style></style>