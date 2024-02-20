<template>
    <div class="px-8 mt-4">
        <v-row>
            <v-col cols="12" sm="6" md="6" lg="3">
                <v-text-field label="Tìm kiếm" append-inner-icon="mdi-magnify" density="compact" variant="outlined">
                </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="12" md="4" lg="9" class="text-right">
                <v-btn color="#0F60FF" prepend-icon="mdi-plus" height="40" width="130"
                    @click="dialog = true, currentValue = ''">Tạo
                    mới</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card elevation="3" style="border-radius: 8px;" class="mb-4">
                    <v-row class="mt-1">
                        <v-col cols="12">
                            <v-card variant="text" class="ma-4">
                                <v-table density="compact">
                                    <thead>
                                        <tr>
                                            <th class=" text-left text-uppercase text-medium-emphasis">
                                                Tên sản phẩm
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Giá
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Số lượng
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Mô tả
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Ảnh
                                            </th>
                                            <th class="text-center text-uppercase text-medium-emphasis">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in products" :key="i" style="height: min-content;">
                                            <td>{{ item.name }}</td>
                                            <td>$ {{ item.price }}</td>
                                            <td>{{ item.quantity }}</td>
                                            <td class="v-text-truncate">
                                                {{ item.description }}
                                            </td>
                                            <td class="text-center">
                                                <v-img :src="item.image" :width="36" contain height="36" />
                                            </td>
                                            <td class="text-center">
                                                <v-icon @click="currentValue = item, dialog = true"
                                                    class="ma-1">mdi-clipboard-edit-outline</v-icon>
                                                <v-icon @click="dialogremove = true, id = item.id"
                                                    class="ma-1">mdi-trash-can-outline</v-icon>
                                            </td>
                                        </tr>
                                        <v-divider></v-divider>
                                    </tbody>
                                </v-table>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row class="ma-2">
                        <v-col cols="8">
                            <v-row>
                                <p class="mt-5 opacity">Showing</p>
                                <v-col cols="2">
                                    <v-select v-model="seletedValue" density="compact"
                                        :items="['10', '20', '25', '30', '50']" variant="outlined"></v-select>
                                </v-col>
                                <p class="mt-5 opacity">of 50</p>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <v-pagination v-model="page" active-color="#0F60FF" variant="text" density="compact"
                                :length="lengthPage"></v-pagination>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <DialogProduct v-model="dialog" :currentValue="currentValue" @close="dialog = false" @updateData="loadData()" />
        <Confirm :dialogremove="dialogremove" :message="'Bạn có muốn xóa thông tin'" @close="dialogremove = false"
            @Remove="Remove()" />
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ProductStore } from '../store/product.store';
import DialogProduct from './DialogProduct.vue';
import { IProduct } from "./interface";
import { DEFAULT_LIMIT_FOR_PAGINATION, DEFAULT_COMMON_LIST_QUERY } from '../../../../common/constants';
import Confirm from '@/common/Element/Confirm.vue';
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
const productStore = new ProductStore();
const currentValue = ref('');
const dialog = ref(false);
const dialogremove = ref(false)
const id = ref('');
const products = ref([]);
let page = ref(1)
let lengthPage = ref(1)
const loadData = async () => {
    const data = await productStore.getProducts();
    products.value = data.items;
    lengthPage.value = Math.ceil(data.totalItems / seletedValue.value);
};
watch(page, (newVal) => {
    DEFAULT_COMMON_LIST_QUERY.page = newVal
    loadData()
})
watch(seletedValue, (newval) => {
    DEFAULT_COMMON_LIST_QUERY.limit = newval
    DEFAULT_COMMON_LIST_QUERY.page = 1
    page.value = 1
    loadData()
})
const Remove = async () => {
    const data = await productStore.deleteProduct(id.value);
    loadData();
    id.value = '';
    dialogremove.value = false;
}
onMounted(() => {
    loadData();
});
</script>
<style scoped>
.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.opacity {
    opacity: 0.6;
}
</style>