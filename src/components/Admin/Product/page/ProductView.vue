<template>
    <div style="margin: 1.5%;">
        <v-row>
            <v-col cols="5" sm="4" md="4" lg="3">
                <v-text-field variant="solo" placeholder="Tìm kiếm" @change="searchData()" v-model="search"
                    append-inner-icon="mdi-magnify" density="compact">
                </v-text-field>
            </v-col>
            <v-col cols="7" class="text-right" lg="9" sm="8" md="8">
                <v-btn color="#0F60FF" prepend-icon="mdi-plus" class="text-capitalize" min-height="40" min-width="122"
                    rounded="lg" @click="dialog = true, currentValue = ''">Tạo
                    mới</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" style="margin-top: -24px;">
                <v-card style="border-radius: 16px; border: 1px;">
                    <v-table density="compact">
                        <thead>
                            <tr style="height: 47px;">
                                <th class="text-left text-disabled text-uppercase text-medium-emphasi">
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
                            <tr v-if="products.length > 0" v-for="(item, index) in products" :key="index">
                                <td style="width: 250px;height: 58px;"><b>
                                        <p
                                            style="width: 100%;max-height: 58px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                                            {{ item.name }}</p>
                                    </b></td>
                                <td>${{ formatNumberWithCommas(item.price) }}</td>
                                <td>{{ formatNumberWithCommas(item.quantity) }}</td>
                                <td style="max-width: 250px;height: 58px;" class="text-truncate">
                                    {{ item.description }}
                                </td>
                                <td>
                                    <v-img style="border-radius: 2px;" width="36" height="36" :src="item.image"></v-img>
                                </td>
                                <td class="text-center">
                                    <div class="d-flex align-center justify-center">
                                        <span style="cursor: pointer;" @click="currentValue = item, dialog = true"
                                            class="mr-3"><img width="24" height="24" :src="icon_edit"></span>
                                        <span style="cursor: pointer;" @click="dialogremove = true, id = item.id"><img
                                                width="24" height="24" :src="icon_delete"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr v-else style="height: 58px;">
                                <td colspan="6">
                                    <p class="text-center text-red">Không có dữ liệu</p>
                                </td>
                            </tr>
                            <tr></tr>
                        </tbody>
                    </v-table>
                    <v-row v-show="products.length > 0" class="ma-2 ">
                        <v-col cols="10" sm="9" md="6" lg="8">
                            <v-row>
                                <span class="mt-5 opacity">Showing</span>
                                <v-col style="max-width: 105px" cols="5" sm="4" md="5" lg="2">
                                    <v-select v-model="seletedValue" density="compact"
                                        :items="['10', '20', '25', '30', '50']" variant="outlined"></v-select>
                                </v-col>
                                <span class="mt-5 opacity">of {{ total }}</span>
                            </v-row>
                        </v-col>
                        <v-col cols="2" sm="3" md="6" lg="4">
                            <p class="text-center page-table1" style="font-size: 15px;display: none;margin-top: 5px;">
                                <span style="margin-bottom: 2px" @click="page = page - 1"
                                    :class="{ 'text-grey-lighten-2': page === 1, 'text-black': page !== 1 }"><i
                                        class="fa-solid fa-angle-left" style="cursor: pointer;"></i></span>
                                <span
                                    style="font-weight: 700;background-color: #E2ECFF;color: blue;opacity: 0.6;;border-radius: 2px;padding: 6px 10px;"
                                    class="ml-3 mr-3">{{ page }}</span>
                                <span style="margin-bottom: 2px;margin-right: 5px;" @click="page = page + 1"
                                    :class="{ 'text-grey-lighten-2': page === lengthPage, 'text-black': page !== lengthPage }"><i
                                        class="fa-solid fa-chevron-right" style="cursor: pointer;"></i></span>
                            </p>
                            <v-pagination class="page-table2 mt-1" v-model="page" active-color="#0F60FF" variant="text"
                                density="compact" :length="lengthPage"></v-pagination>
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
import icon_delete from "@/assets/trash.png"
import icon_edit from "@/assets/edit.png"
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
import { showSuccessNotification, showErrorNotification, formatNumberWithCommas } from '../../../../common/helpers';
const { fetchProducts, searchProducts } = useProduct()


const search = ref('');
watch(search, (newval, oldval) => {
    if (newval === '') {
        // page.value = 1;
    }
})
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY.page = 1
    const data = await searchProducts();
    products.value = data?.items;
    total.value = data?.totalItems;
    page.value = 1;

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
    DEFAULT_COMMON_LIST_QUERY.keyword = '';
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    loadData();
});
</script>

<style scoped>
body {
    font-family: 'Public Sans', sans-serif;
}

th {
    font-family: 'Public Sans', sans-serif;
    font-weight: 500;
    color: #8B909A;
    font-size: 13px;
}

td {
    font-family: 'Public Sans', sans-serif;
    font-size: 15px;
}

p {
    font-family: 'Public Sans', sans-serif;
}

.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.opacity {
    opacity: 0.6;
}

.v-table {
    font-size: 15px;
}

@media ((min-width: 501px) and (max-width: 650px)) {
    .page-table1 {
        display: flex !important;
        align-items: center;
        justify-content: center;
    }

    .page-table2 {
        display: none !important;
    }
}

@media (max-width: 500px) {
    .opacity {
        display: none;
    }

    .v-btn__content {
        font-size: 10px;
    }

    .text-medium-emphasis {
        font-size: 12px;
    }

    .page-table1 {
        display: flex !important;
        align-items: center;
        justify-content: center;
    }

    .page-table2 {
        display: none !important;
    }
}
</style>