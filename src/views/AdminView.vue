<template>
    <v-app>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
                <v-toolbar @click.stop="rail = !rail" style="background-color: white;">
                    <v-row>
                        <v-col cols="8">
                            <v-toolbar-title @click.stop="rail = !rail" class="ma-3">
                                <v-img style="min-width: 100px;max-height: 28px;filter: contrast();"
                                    src="https://res.cloudinary.com/dgtjdhrnq/image/upload/v1705460127/logo1_adshdl.png"></v-img>
                            </v-toolbar-title>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="text-center mr-2" cols="2">
                            <v-img src="../assets/icon/indent-decrease.png" height="24" width="24"
                                @click.stop="rail = !rail" class="mt-3 d-sm-none d-md-block d-lg-block"></v-img>
                        </v-col>
                    </v-row>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item v-show="this.rail == false" class="text-uppercase"
                        style="opacity: 0.6;font-size: 13px;">Quản
                        lý sản phẩm</v-list-item>
                    <v-list-item prepend-icon="mdi-apps" title="Sản phẩm" value="Sản phẩm"
                        to='/admin/sanpham'></v-list-item>
                    <v-list-item prepend-icon="mdi-account-group" title="User" value="User" to='/admin/user'></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar class="px-4" color="rgb(247, 247, 247)" :elevation="0" rounded="0">
                <v-icon class="d-sm-block d-md-none" @click="drawer = !drawer, rail = !rail">mdi-menu</v-icon>
                <h3 class="reposive ml-4">{{ title }}</h3>
                <v-spacer></v-spacer>
                <v-btn>
                    <v-badge content="5" color="red">
                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
                <v-avatar class="mr-4">
                    <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                </v-avatar>
            </v-app-bar>
            <v-main style="background-color: rgb(247, 247, 247);min-height: 100vh;">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-app>
</template>
// Your component file (e.g., AdminView.vue)
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import router from '../router';
const drawer = ref(true);
const rail = ref(true);

onMounted(() => {
});

</script>


<style scoped>
/* @media (min-width: 600px) and (max-width: 960px) {
    .reposive {
        margin-left: 0.2%;
    }

    .img_drawer {
        display: none;
    }

    .navigation_drawer {
        display: none;
    }
} */
</style>
