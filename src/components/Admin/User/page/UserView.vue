<template>
    <div class="px-8 mt-4">
        <v-row>
            <v-col sm="12" md="5" lg="3" style="max-width: 316px;!important">
                <v-text-field variant="solo" placeholder="Tìm kiếm" @change="searchData()" v-model="search"
                    append-inner-icon="mdi-magnify" density="compact">
                </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col sm="4" md="5" lg="4" class="text-right">
                <v-btn color="#0F60FF" prepend-icon="mdi-plus" class="text-capitalize" min-height="40" min-width="122"
                    rounded="lg" @click="dialog = true, currentValue = ''">Tạo
                    mới</v-btn>
            </v-col>
        </v-row>
        <v-row style="margin-top: -2%;">
            <v-col cols="12">
                <v-card elevation="3" class="mb-4" style="border-radius: 16px;">
                    <v-row>
                        <v-col cols="12">
                            <v-card variant="text">
                                <v-table density="compact" fixed-header>
                                    <thead style="height: 47px;">
                                        <tr>
                                            <th class="text-center text-disabled text-uppercase text-medium-emphasi">
                                                Avatar
                                            </th>
                                            <th class="text-left text-disabled text-uppercase text-medium-emphasis">
                                                Tên người dùng
                                            </th>
                                            <th class="text-left text-disabled text-uppercase text-medium-emphasis">
                                                Email
                                            </th>
                                            <th class="text-center text-disabled text-uppercase text-medium-emphasis">
                                                Ngày sinh
                                            </th>
                                            <th class="text-center text-disabled text-uppercase text-medium-emphasis">
                                                Số điện thoại
                                            </th>
                                            <th class="text-center text-disabled text-uppercase text-medium-emphasis">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in users" :key="i" style="height: 58px;">
                                            <td>
                                                <v-img class="mx-auto" :src="item.avatar" width="36" contain height="36" />
                                            </td>
                                            <td class="text-left text-truncate font-weight-medium"
                                                style="max-width: 150px;">{{
                                                    item.name
                                                }}</td>
                                            <td class=" text-truncate" style="max-width: 150px;">
                                                {{ item.email }}

                                            </td>
                                            <td class="v-text-truncate text-center">
                                                {{ formatDatetime(item.birthday) }}
                                            </td>
                                            <td class="text-center">
                                                {{ maskPhone(item.phone) }}
                                            </td>
                                            <td class="text-center text-disabled">
                                                <v-icon class="ma-1"
                                                    @click="dialog = true, currentValue = item">mdi-clipboard-edit-outline</v-icon>
                                                <v-icon class="ma-1"
                                                    @click="dialogremove = true, id = item.id">mdi-trash-can-outline</v-icon>
                                            </td>
                                        </tr>
                                        <v-divider></v-divider>
                                    </tbody>
                                </v-table>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col lg="8" md="4" sm="12">
                            <v-row>
                                <p class="ml-6 opacity">Showing</p>
                                <v-col sm="12" md="1" lg="4" class="d-flex">
                                    <v-select v-model="seletedValue" density="compact" style="max-width: 28%!important;"
                                        :items="['10', '20', '40', '30', '50']" variant="outlined"></v-select>
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
        <UserDialog v-model="dialog" @close="dialog = false" :currentValue="currentValue" @updateData="loadData()" />
        <Confirm :dialogremove="dialogremove" :message="'Bạn có muốn xóa thông tin'" @close="dialogremove = false"
            @Remove="Remove()" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION } from '../../../../common/constants';
import { useUser } from '../Service/user.service';
import UserDialog from './UserDialog.vue';
import Confirm from '../../../../common/Element/Confirm.vue'
const { fetchUsers, query, searchUsers } = useUser()
import { userServiceApi } from '@/components/Admin/User/Service/user.api';
import { showSuccessNotification, showErrorNotification, truncateText, maskPhone } from '../../../../common/helpers';

const currentValue = ref('');
const users = ref([]);
const dialogremove = ref(false)
const id = ref('');
const dialog = ref(false);
const total = ref('');
let lengthPage = ref(1)
let page = ref(1)
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)

watch(seletedValue, (newval) => {
    DEFAULT_COMMON_LIST_QUERY.limit = newval
    DEFAULT_COMMON_LIST_QUERY.page = 1
    page.value = 1
    loadData()
})
watch(page, (newVal) => {
    DEFAULT_COMMON_LIST_QUERY.page = newVal
    loadData()
})
const formatDatetime = (date) => {
    const dateObject = new Date(date);
    const ngay = dateObject.getDate().toString().padStart(2, '0');
    const thang = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const nam = dateObject.getFullYear();
    const ngayThangNam = `${thang}/${ngay}/${nam}`;
    return ngayThangNam;
}
const loadData = async () => {
    const data = await fetchUsers();
    users.value = data?.items;
    total.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / seletedValue.value);

};
const search = ref('');
watch(search, (newval, oldval) => {
    // DEFAULT_COMMON_LIST_QUERY.keyword = newval
    if (newval == '')
        return loadData();
    // DEFAULT_COMMON_LIST_QUERY.page = 1
    // searchData()
    // alert(newval)
})
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = search.value;
    const data = await searchUsers();
    users.value = data?.items;
    total.value = data?.totalItems;
    lengthPage.value = Math.ceil(data?.totalItems / seletedValue.value);
}
const Remove = async () => {
    const data = await userServiceApi._delete(id.value);
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
.v-pagination__prev {
    margin: 1px !important;

}

.opacity {
    font-display: Public Sans;
    margin-top: 18px;
    opacity: 0.6;
}
</style>