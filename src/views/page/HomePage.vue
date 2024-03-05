<template>
    <div>
        <v-app-bar :elevation="0" rounded>
            <v-row style="max-width: 208px; max-height: 88px">
                <v-img src="../../assets/image/Logo.png" width="208px" height="88px"></v-img>
            </v-row>
            <v-app-bar-title style="
          max-width: 143px;
          max-height: 32px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          line-height: 31.6px;
          color: #5a5b6a;
        ">
                Sell on Shopka
            </v-app-bar-title>
            <v-app-bar-title style="
          max-width: 80px;
          max-height: 32px;
          font-weight: 400;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          line-height: 31.6px;
          color: #5a5b6a;
          margin-right: 2%;
        ">
                Register
            </v-app-bar-title>
            <v-text-field density="compact" variant="solo-filled" label="Search for products..." style="
          max-width: 668px;
          max-height: 48px;
          background-color: #ededf0;
          border-radius: 62px !important;
        " v-model="search" prepend-inner-icon="mdi-magnify" clearable single-line flat hide-details
                rounded></v-text-field>
            <v-app-bar-title style="
          max-width: 210px;
          max-height: 32px;
          font-weight: 400;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          line-height: 31.6px;
          color: #2264d1;
        ">
                Consumer Electronics
            </v-app-bar-title>
            <template v-slot:append>
                <v-btn variant="outlined" color="#2264D1" width="104px" height="40px" class="mr-2">
                    <span class="text-capitalize" style="
              font-family: 'Quicksand', sans-serif;
              font-weight: 700;
              font-size: 20px;
              line-height: 30px;
              color: #2264d1;
            ">Sign</span>
                    <p class="text-lowercase" style="
              font-family: 'Quicksand', sans-serif;
              font-weight: 700;
              font-size: 20px;
              line-height: 30px;
              color: #2264d1;
            ">
                        in
                    </p>
                </v-btn>
                <div class="ml-2 mr-2" style="position: relative">
                    <div style="
              position: absolute;
              background-color: #f44336;
              color: #ffffff;
              border-radius: 50%;
              max-width: 20px;
              max-height: 20px;
              right: 0;
              font-size: 14px;
              line-height: 17.5px;
              top: -8px;
              margin: auto;
              z-index:1000;
            ">
                        <span style="padding: 10px;text-align: center;align-items: center;">5</span>
                    </div>
                    <v-btn width="99px" height="40px" elevation="2" color="#2979FF">
                        <span class="text-capitalize" style="
                font-family: 'Quicksand', sans-serif;
                font-weight: 700;
                font-size: 20px;
                line-height: 30px;
                color: #2264d1;
              ">My</span>
                        <p class="text-lowercase" style="
                font-family: 'Quicksand', sans-serif;
                font-weight: 700;
                font-size: 20px;
                line-height: 30px;
                color: #2264d1;
              ">
                            cart
                        </p>
                    </v-btn>
                </div>
                <v-avatar class="ml-2">
                    <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" width="40px"
                        height="40px"></v-img>
                </v-avatar>
            </template>
        </v-app-bar>
        <div>
            <v-row class="d-flex justify-center">
                <v-tabs v-model="tab" align-tabs="start" stacked height="56px" color="#EBF2FF">
                    <v-tab value="tab-1" height="56px">
                        <v-img src="../../assets/icon/hanger.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #2979FF;">Clothing
                            &
                            Shoes</span>
                    </v-tab>
                    <v-tab value="tab-2">
                        <v-img src="../../assets/icon/cinema.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Entertainment</span>
                    </v-tab>

                    <v-tab value="tab-3">
                        <v-img src="../../assets/icon/concert.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Music</span>
                    </v-tab>
                    <v-tab value="tab-4">
                        <v-img src="../../assets/icon/fitness.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Sport
                            & Lifestyle</span>
                    </v-tab>
                    <v-tab value="tab-5">
                        <v-img src="../../assets/icon/pets.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Pets</span>
                    </v-tab>
                    <v-tab value="tab-6">
                        <v-img src="../../assets/icon/restaraunt.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Kitchen
                            Accessories</span>
                    </v-tab>
                    <v-tab value="tab-7">
                        <v-img src="../../assets/icon/observation.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Travel
                            Equipment</span>
                    </v-tab>
                    <v-tab value="tab-8">
                        <v-img src="../../assets/icon/barley.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Growing
                            & Garden</span>
                    </v-tab>
                    <v-tab value="tab-5">
                        <v-img src="../../assets/icon/powerstation.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Electrical
                            Tools</span>
                    </v-tab>
                    <v-tab value="tab-5">
                        <v-img src="../../assets/icon/babysitter.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Mother
                            Care</span>
                    </v-tab>
                    <v-tab value="tab-5">
                        <v-img src="../../assets/icon/nuclear-station.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Toys
                            &
                            Entertainment</span>
                    </v-tab>
                    <v-tab value="tab-5">
                        <v-img src="../../assets/icon/ship-wheel.png" width="20px" height="20px"></v-img>
                        <span class="text-capitalize"
                            style="font-size: 14px;font-family: 'Inter', sans-serif;font-weight: 400;color: #787885;">Vintage</span>
                    </v-tab>
                </v-tabs>
                <v-window v-model="tab" style="width: 89.1%">
                    <v-window-item v-for="i in tab" :key="i" :value="'tab-' + i">
                        <v-row>
                            <v-col cols="3" lg="3" md="3" sm="3">
                                <CardView />
                            </v-col>
                            <v-col cols="9" lg="9" md="9" sm="9">
                                <HomeView />
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HomeView from '../HomeView.vue'
import CardView from '../page/CardView.vue'
import { ref } from "vue";

const search = ref("useless items on white background");
const tab = ref(null);
const text = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat')
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: "Inter", sans-serif !important;
}
</style>
