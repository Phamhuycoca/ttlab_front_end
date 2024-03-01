<template>
    <div style="margin: 1.5%;">
        <v-row>
            <v-col cols="5" sm="4" md="4" lg="3">
                <v-text-field variant="solo" placeholder="Tìm kiếm" @change="searchData()" v-model="search"
                    append-inner-icon="mdi-magnify" density="compact" single-line hide-details>
                </v-text-field>
            </v-col>
            <v-col cols="7" class="text-right" lg="9" sm="8" md="8">
                <v-btn color="#0F60FF" prepend-icon="mdi-plus" class="text-capitalize" min-height="40" max-width="122"
                    rounded="lg" @click="dialog = true, currentValue = ''">Tạo
                    mới</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;border: 1px;">
                    <v-table density="compact">
                        <thead>
                            <tr style="height: 47px">
                                <th style="width: 5px !important;padding-right: 0px;"
                                    class="text-left text-disabled text-uppercase text-medium-emphasi">
                                    <span>Avatar</span>
                                </th>
                                <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                    Tên người dùng
                                </th>
                                <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                    Email
                                </th>
                                <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                    Ngày sinh
                                </th>
                                <th class="text-left text-disabled text-uppercase text-medium-emphasi">
                                    Số điện thoại
                                </th>
                                <th class="text-center text-disabled text-uppercase text-medium-emphasi">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="users.length > 0" v-for="i in users" :key="i" style="height: 58px;">
                                <td>
                                    <v-img style="border-radius: 2px;" width="36" height="36" :src="i.avatar"></v-img>
                                </td>
                                <td style="color: #23272E;font-weight: 600;">{{ i.name }}</td>
                                <td>{{ i.email }}</td>
                                <td class="v-text-truncate">
                                    {{ formatDatetime(i.birthday) }}
                                </td>
                                <td>
                                    {{ maskPhone(i.phone) }}
                                </td>
                                <td class="text-center text-disabled">
                                    <div class="d-flex align-center justify-center">
                                        <span style="cursor: pointer;" @click="dialog = true, currentValue = i"
                                            class="mr-3"><img width="24" height="24" :src="icon_edit"></span>
                                        <span style="cursor: pointer;" @click="dialogremove = true, id = i.id"><img
                                                width="24" height="24" :src="icon_delete"></span>
                                    </div>

                                </td>
                            </tr>
                            <tr v-else>
                                <td colspan="6">
                                    <p class="text-center text-red">Không có dữ liệu</p>
                                </td>
                            </tr>
                            <tr></tr>
                        </tbody>
                    </v-table>
                    <v-row v-show="users.length > 0" class="ma-2">
                        <v-col cols="8" sm="8" md="8" lg="8">
                            <v-row>
                                <p class="mt-5 opacity">Showing</p>
                                <v-col style="max-width: 105px" cols="5" sm="4" md="5" lg="2">
                                    <v-select v-model="seletedValue" density="compact"
                                        :items="['10', '20', '25', '30', '50']" variant="outlined"></v-select>
                                </v-col>
                                <p class="mt-5 opacity">of {{ total }}</p>
                            </v-row>
                        </v-col>
                        <v-col cols="4" sm="4" md="4" lg="4">
                            <p class="text-center page-table1" style="font-size: 15px;display: none;margin-top: 5px;">
                                <span style="margin-bottom: 2px" @click="page = page - 1"
                                    :class="{ 'text-grey-lighten-2': page === 1, 'text-black': page !== 1 }"><i
                                        class="fa-solid fa-angle-left" style="cursor: pointer;"></i></span>
                                <span
                                    style="background-color: #E2ECFF;color: blue;opacity: 0.6;;border-radius: 4px;padding: 5px;"
                                    class="ml-2 mr-2">{{ page }}</span>
                                <span style="margin-bottom: 2px" @click="page = page + 1"
                                    :class="{ 'text-grey-lighten-2': page === lengthPage, 'text-black': page !== lengthPage }"><i
                                        class="fa-solid fa-chevron-right" style="cursor: pointer;"></i></span>
                            </p>
                            <v-pagination class="page-table2" v-model="page" active-color="#0F60FF" variant="text"
                                density="compact" :length="lengthPage"></v-pagination>
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
import icon_delete from "@/assets/trash.png"
import icon_edit from "@/assets/edit.png"
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
watch(page, (newVal, oldval) => {
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
    if (newval === '' && oldval !== '') {
        page.value = 1;
    }
    // if (newval !== oldval) {
    //     return loadData();
    // }
    // searchData()
    // alert(newval)
})
const searchData = async () => {
    // page.value = 1
    DEFAULT_COMMON_LIST_QUERY.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY.page = 1
    const data = await searchUsers();
    users.value = data?.items;
    total.value = data?.totalItems;
    // page.value = 1;
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

.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.opacity {
    opacity: 0.6;
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
        align-items: flex-end;
        justify-content: center;
    }

    .page-table2 {
        display: none !important;
    }
}
</style>