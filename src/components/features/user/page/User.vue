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
                <v-card elevation="3" class="rounded-lg">
                    <v-row>
                        <v-col cols="12">
                            <v-card variant="text">
                                <v-table density="compact">
                                    <thead style="height: 47px;">
                                        <tr>
                                            <th class="text-left text-uppercase text-medium-emphasi">
                                                Avatar
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Tên người dùng
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Email
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Ngày sinh
                                            </th>
                                            <th class="text-left text-uppercase text-medium-emphasis">
                                                Số điện thoại
                                            </th>
                                            <th class="text-center text-uppercase text-medium-emphasis">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style="height: 58px;">
                                        <tr v-for="(item, i) in users" :key="i">
                                            <td>
                                                <v-img :src="item.avatar" :width="36" contain height="36" />
                                            </td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.email }}</td>
                                            <td class="v-text-truncate">
                                                {{ formatDatetime(item.birthday) }}
                                            </td>
                                            <td class="text-left">
                                                {{ item.phone }}
                                            </td>
                                            <td class="text-center">
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
        <UserDialog v-model="dialog" @close="dialog = false" :currentValue="currentValue" @updateData="loadData()" />
        <Confirm :dialogremove="dialogremove" :message="'Bạn có muốn xóa thông tin'" @close="dialogremove = false"
            @Remove="Remove()" />
    </div>
</template>
<script setup lang="ts">
import { userStore } from '../store/user.store'
const userUse = new userStore();
import UserDialog from '../page/UserDialog.vue'
import { ref, onMounted, watch } from 'vue';
import Confirm from '@/common/Element/Confirm.vue';
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_LIMIT_FOR_PAGINATION } from '../../../../common/constants';
const currentValue = ref('');
const users = ref([]);
const dialogremove = ref(false)
const id = ref('');
const dialog = ref(false);
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
const loadData = async () => {
    const data = await userUse.getUsers();
    users.value = data.items;
    lengthPage.value = Math.ceil(data.totalItems / seletedValue.value);

};
const formatDatetime = (date) => {
    const dateObject = new Date(date);
    const ngay = dateObject.getDate().toString().padStart(2, '0');
    const thang = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const nam = dateObject.getFullYear();
    const ngayThangNam = `${thang}/${ngay}/${nam}`;
    return ngayThangNam;
}
const Remove = async () => {
    const data = await userUse.deleteUser(id.value);
    loadData();
    id.value = '';
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
</style>