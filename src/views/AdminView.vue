<template>
    <v-app>
        <v-navigation-drawer style="border: 1px;position: fixed;" v-model="drawer" :rail="rail" class="navigation_drawer"
            permanent>
            <v-toolbar @click.stop="rail = !rail" style="background-color: white;">
                <v-row>
                    <v-col cols="8">
                        <v-toolbar-title @click.stop="rail = !rail" class="ma-3">
                            <v-img width="250"
                                src="https://res.cloudinary.com/dgtjdhrnq/image/upload/v1705460127/logo1_adshdl.png"></v-img>
                        </v-toolbar-title>
                    </v-col>
                    <v-col class="text-center" cols="4">
                        <v-img src="../assets/icon/indent-decrease.png" height="30" @click.stop="rail = !rail"
                            class="mt-2"></v-img>
                    </v-col>
                </v-row>
            </v-toolbar>
            <v-list density="compact" nav>
                <v-list-item v-show="this.rail == false" class="text-uppercase" style="opacity: 0.6;font-size: 13px;">Quản
                    lý sản phẩm</v-list-item>
                <v-list-item prepend-icon="mdi-apps" title="Sản phẩm" value="Sản phẩm" to='/admin/sanpham'></v-list-item>
                <v-list-item prepend-icon="mdi-account-group" title="User" value="User" to='user'></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar class="px-4" style="background-color: #FAFAFA;" :elevation="0" rounded="0">
            <v-icon @click="rail = !rail, drawer = !drawer"
                class="d-xs-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none ml-4">mdi-menu</v-icon>
            <h3 class="title ml-4" style="font-size: 24px;">
                {{ this.$router.currentRoute.value.name === "product" ? "Danh sách sản phẩm" : "Danh sách người dùng" }}
            </h3>
            <v-spacer></v-spacer>
            <v-btn>
                <v-badge content="5" color="red">
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>
            <v-avatar class="mr-4" id="menu-activator" style="cursor: pointer;">
                <v-img v-if="avatar === null" src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                <v-img v-else :src="avatar" alt="John"></v-img>

            </v-avatar>
            <v-menu activator="#menu-activator" style="cursor: pointer;" width="200">
                <v-list>
                    <v-list-item>
                        <v-list-item-title style="height: 40px;">Xem thông tin</v-list-item-title>
                        <v-list-item-title @click="dialogremove = true">Đăng xuất</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-main style="background-color: #FAFAFA;min-height: 100vh;">
            <router-view></router-view>
        </v-main>
        <confirm :dialogremove="dialogremove" :message="'Bạn có muốn đăng xuất'" @close="dialogremove = false"
            @Remove="Remove()" />
    </v-app>
</template>

<script lang="ts" setup>
import Confirm from '@/common/Element/Confirm.vue';
import router from '../router';
import { showSuccessNotification } from '../common/helpers';
import { useLoadingStore } from '@/store/loading.store';
import localStorageAuthService from '../common/storages/authStorage';
import { ref, onMounted } from 'vue';

const loading = useLoadingStore();

const drawer = ref(true)
const rail = ref(false)
const dialogremove = ref(false)
const avatar = ref('')
const Remove = async () => {
    loading.openLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/login');
        showSuccessNotification('Đăng xuất thành công');
    } finally {
        loading.openLoading(false);
    }
}
onMounted(() => {
    avatar.value = localStorageAuthService.getAvatar();
});
</script>


<style scoped>
@media (min-width: 1200px) {
    .reposive {
        margin-left: 0.2%;
    }
}
</style>
