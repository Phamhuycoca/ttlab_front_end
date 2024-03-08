<template>
    <v-app>
        <v-navigation-drawer style="border: 1px;position: fixed;" v-model="drawer" :rail="rail"
            class="navigation_drawer" permanent>
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
                <v-list-item v-show="this.rail == false" class="text-uppercase ml-1"
                    style="line-height: 14px; font-weight: 400;font-size: 11px;font-family: Public Sans, sans-serif;color: #8B909A;">Quản
                    lý sản phẩm</v-list-item>
                <v-list-item style="color: #8B909A;font-size: 24px;" to='/admin/sanpham'>
                    <div style="display: flex; align-items: flex-start;">
                        <!-- <img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709198095/box_fcjahg.png"
                            style="width: 22px; height: 22px;"><img> -->
                        <v-img v-if="this.$router.currentRoute.value.name === 'product'" src="../assets/icon/box.png"
                            style="width: 22px; height: 22px;"></v-img>
                        <v-img v-else src="../assets/box_2.png" style="width: 22px; height: 22px;"></v-img>
                        <div class="font-weight-medium" v-if="this.$router.currentRoute.value.name === 'product'"
                            style="width: 170px; height: 22px; margin-left: 8px; font-family: Public Sans, sans-serif; font-size: 15px; font-weight: 400; line-height: 22px; color: #23272E;">
                            Sản Phẩm
                        </div>
                        <div v-else class="font-weight-medium"
                            style="width: 170px; height: 22px; margin-left: 8px; font-family: Public Sans, sans-serif; font-size: 15px; font-weight: 400; line-height: 22px; color: #8B909A;">
                            Sản Phẩm
                        </div>
                    </div>
                </v-list-item>
                <v-list-item style="color: #8B909A;font-size: 24px;" to='/admin/user'>
                    <div style="display: flex; align-items: flex-start;">
                        <v-img v-if="this.$router.currentRoute.value.name === 'user'" src="../assets/users_2.png"
                            style="width: 22px; height: 22px;"></v-img>
                        <v-img v-else src="../assets/icon/users.png" style="width: 22px; height: 22px;"></v-img>
                        <div class="font-weight-medium" v-if="this.$router.currentRoute.value.name === 'user'"
                            style="width: 170px; height: 22px; margin-left: 8px; font-family: Public Sans, sans-serif; font-size: 15px; font-weight: 400; line-height: 22px; color: #23272E;">
                            Users
                        </div>
                        <div class="font-weight-medium" v-else
                            style="width: 170px; height: 22px; margin-left: 8px; font-family: Public Sans, sans-serif; font-size: 15px; font-weight: 400; line-height: 22px; color: #8B909A;">
                            Users
                        </div>
                    </div>
                </v-list-item>
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
                    <!-- <v-icon style="width: 26px;height: 26px;">mdi-bell-outline</v-icon> -->
                    <v-img src="../assets/icon/bell.png" style="width: 26px; height: 26px;"></v-img>

                </v-badge>
            </v-btn>
            <v-avatar class="mr-1" id="menu-activator" style="cursor: pointer;">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
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

<script lang="ts">
import Confirm from '@/common/Element/Confirm.vue';
import router from '../router';
import { showSuccessNotification } from '../common/helpers';
import { useLoadingStore } from '@/store/loading.store';
import localStorageAuthService from '../common/storages/authStorage';

const loading = useLoadingStore();

export default {
    data() {
        return {
            drawer: true,
            rail: false,
            dialogremove: false,
            avatar: '' // Add the avatar property here
        };
    },
    methods: {
        async Remove() {
            loading.openLoading(true);

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                router.push('/login');

                showSuccessNotification('Đăng xuất thành công');
            } finally {
                loading.openLoading(false);
            }
        }
    },
    components: { Confirm }
}
</script>


<style scoped>
@media (min-width: 1200px) {
    .reposive {
        margin-left: 0.2%;
    }
}
</style>
