<template>
    <div class="px-8 mt-4">
        <v-row>
            <v-col sm="4" md="5" lg="3" style="max-width: 316px;!important">
                <v-text-field label="Tìm kiếm" @change="searchData()" v-model="search" append-inner-icon="mdi-magnify"
                    density="compact" variant="solo">
                </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col sm="1" md="3" lg="4" class="text-right">
                <v-btn color="#0F60FF" prepend-icon="mdi-plus" min-height="40" min-width="122"
                    @click="dialog = true, currentValue = ''">Tạo
                    mới</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card elevation="3" class="rounded-lg mb-4" min-height="726">
                    <v-row>
                        <v-col cols="12">
                            <v-card variant="text">
                                <v-table density="compact">
                                    <thead style="height: 47px;">
                                        <tr>
                                            <th class=" text-left text-disabled text-uppercase text-medium-emphasi">
                                                Tên sản phẩm
                                            </th>
                                            <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                                Giá
                                            </th>
                                            <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                                Số lượng
                                            </th>
                                            <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                                Mô tả
                                            </th>
                                            <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                                Ảnh
                                            </th>
                                            <th class="text-center text-disabled text-uppercase text-medium-emphasi">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in products" :key="i" style="height: 58px;">
                                            <td>{{ item.name }}</td>
                                            <td>${{ item.price }}</td>
                                            <td>{{ item.quantity }}</td>
                                            <td class="text-truncate font-weight-medium" style="max-width: 150px;">
                                                {{ item.description }}
                                            </td>
                                            <td class="text-center">
                                                <v-img :src="item.image" width="36" contain height="36" />
                                            </td>
                                            <td class="text-center text-disabled">
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
                    <v-row>
                        <v-col lg="8" md="4" sm="1">
                            <v-row>
                                <p class="mt-5 ml-6 opacity">Showing</p>
                                <v-col sm="1" md="1" lg="3" class="d-flex">
                                    <v-select v-model="seletedValue" density="compact" style="max-width: 81px!important;"
                                        :items="['10', '20', '25', '30', '50']" variant="outlined"></v-select>
                                    <p class="opacity mt-2 ml-1">of {{ total }}</p>
                                </v-col>
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
import DialogProduct from '../page/ProductDialog.vue'
import { DEFAULT_LIMIT_FOR_PAGINATION, DEFAULT_COMMON_LIST_QUERY } from '../../../../common/constants';
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
const currentValue = ref('');
const dialog = ref(false);
const dialogremove = ref(false)
const id = ref('');
const products = ref([]);
const total = ref('');

let page = ref(1)
let lengthPage = ref(1)
import { productServiceApi } from "@/components/Admin/Product/Service/product.api";
import { useProduct } from '../Service/product.service';
import Confirm from '../../../../common/Element/Confirm.vue';
import { showSuccessNotification, showErrorNotification } from '../../../../common/helpers';
const { fetchProducts, searchProducts } = useProduct()


const search = ref('');
watch(search, (newval) => {
    DEFAULT_COMMON_LIST_QUERY.keyword = newval
    if (newval != "")
        return
    DEFAULT_COMMON_LIST_QUERY.page = 1
    searchData()
})
const searchData = async () => {
    const data = await searchProducts();
    products.value = data?.items;
    lengthPage.value = Math.ceil(data?.totalItems / seletedValue.value);
}
const loadData = async () => {
    const data = await fetchProducts();
    products.value = data?.items;
    total.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / seletedValue.value);
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
    const data = await productServiceApi._delete(id.value);
    loadData();
    id.value = '';
    if (data.success) {
        showSuccessNotification(data.message);
    } else {
        showErrorNotification(data.error);
    }
    dialogremove.value = false;
}
onMounted(() => {
    loadData();
});
</script>
<style scoped>
.text-truncate {
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
}

.opacity {
    opacity: 0.6;
}
</style>