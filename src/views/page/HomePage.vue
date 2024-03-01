<template>
    <div>
        <v-app-bar :elevation="0">
            <v-row class="d-flex justify-center align-center">
                <v-col lg="4" md="4" sm="12" class="d-flex justify-content align-center" style="margin-left:80px;">
                    <v-app-bar-title class="font-weight-black" style="font-family: 'Integral CF', sans-serif;
    font-size: 32px;
    line-height: 38.4px;
    font-size: 32px;
    letter-spacing: 0em;
    text-align: left;
    width:160px;">SHOP.CO</v-app-bar-title>
                    <div
                        style="width:56px;height:22px;font-family:'Satoshi',sans-serif;font-weight:400;font-size:14px;line-height:21.6px;">
                        Shop
                    </div>
                    <div class="mr-4"
                        style="width:56px;height:22px;font-family:'Satoshi',sans-serif;font-weight:400;font-size:14px;line-height:21.6px;">
                        On sale</div>
                    <div class="mr-4"
                        style="width:87px;height:22px;font-family:'Satoshi',sans-serif;font-weight:400;font-size:14px;line-height:21.6px;">
                        New Arrivals</div>
                    <div
                        style="width:56px;height:22px;font-family:'Satoshi',sans-serif;font-weight:400;font-size:14px;line-height:21.6px;">
                        Brands</div>
                </v-col>
                <v-col lg="5">
                    <v-text-field density="compact" variant="solo-filled" label="Search for products..."
                        style="max-width: 577px; background-color: #ededf0; border-radius: 62px!important;"
                        prepend-inner-icon="mdi-magnify" clearable single-line flat hide-details rounded></v-text-field>
                </v-col>
                <v-col lg="1" class="d-flex justify-content align-center" style="margin-left:-30px;">
                    <v-icon class="mr-4">mdi-cart-outline</v-icon>
                    <v-icon>mdi-account-circle-outline</v-icon>
                </v-col>
            </v-row>
        </v-app-bar>
        <div>
            <v-row>
                <v-col lg="12" md="12" sm="12">
                    <v-img src="../../assets//image/Rectangle 2.png" height="663px" width="100%" cover>
                        <div class="fill-height absolute-fill" align="left" justify="center">
                            <v-row style="margin-top: 5%;">
                                <v-col cols="1"></v-col>
                                <v-col cols="5">
                                    <p style="color: #000000;font-size:64px;font-weight:700;line-height: 64px;">FIND CLOTHES
                                        THAT
                                        MATCHES YOUR STYLE</p>
                                    <p class="text-left" style="color: #000000;opacity: 0.6;margin-top: 32px">Browse through
                                        our
                                        diverse range of meticulously crafted garments, designed to bring out your
                                        individuality
                                        and
                                        cater to your sense of style.</p>
                                    <v-btn class="text-capitalize"
                                        style="color: white;background-color: #000000; width: 210px;height: 52px;font-size: 16px;margin-top: 32px;"
                                        rounded>Shop Now</v-btn>
                                    <v-row style="margin-top: 48px;height: 74px;">
                                        <div>
                                            <b style="font-size: 40px;">200 +</b>
                                            <p style="opacity: 0.6;font-size: 16px;">International Brands</p>
                                        </div>
                                        <v-divider vertical class="mx-5 border-opacity-100"></v-divider>
                                        <div>
                                            <b style="font-size: 40px;">2,000 +</b>
                                            <p style="opacity: 0.6;font-size: 16px;">High-Quality Products</p>
                                        </div>
                                        <v-divider vertical class="mx-5 border-opacity-100"></v-divider>
                                        <div>
                                            <b style="font-size: 40px;">30,000 +</b>
                                            <p style="opacity: 0.6;font-size: 16px;">Happy Customers</p>
                                        </div>
                                    </v-row>
                                </v-col>
                                <v-col cols="1">
                                    <v-img src="../../assets/image/Vector-1.png" cover width="56px" height="56px"
                                        style="top: 48%;left: 20%;"></v-img>
                                </v-col>
                                <v-col cols="5" lg="5" md="8" sm="12">
                                    <v-img src="../../assets//image//Vector-2.png" cover width="104px" height="104px"
                                        style="left: 70%;"></v-img>
                                </v-col>
                            </v-row>
                        </div>
                    </v-img>
                </v-col>
            </v-row>
        </div>
        <div style="height: 122px;background-color: #000000;" class="d-flex justify-content align-center">
            <v-img src="../../assets/Versace.png" contain width="166.48px" height="33.16px"></v-img>
            <v-img src="../../assets/Zara.png" contain width="91px" height="38px"></v-img>
            <v-img src="../../assets/gucci-logo-1 1.png" contain width="156px" height="36px"></v-img>
            <v-img src="../../assets/prada-logo-1 1.png" contain width="194px" height="32px"></v-img>
            <v-img src="../../assets/Calvin.png" contain width="206.79px" height="33.35px"></v-img>
        </div>
        <div
            style="font-family: 'Integral CF', sans-serif;font-weight: 900;font-size: 48px;line-height: 57.6px;text-align:center;">
            NEW ARRIVALS
        </div>
        <div class="d-flex justify-center space-evenly" style="background-color: red;">
            <div class="mt-10" v-for="item in 4" :key="item">
                <div>
                    <v-img src="../../assets/image/image 7.png" width="295px" height="298px" style="border-radius: 20px;"
                        contain></v-img>
                </div>
                <div
                    style="font-family:'Satoshi',sans-serif;color: #000000;font-size: 14px;line-height: 27px;font-weight: 700;">
                    T-SHIRT WITH TAPE DETAILS
                </div>
                <div>
                    <v-row>
                        <v-col cols="5" class="d-flex justify-content align-center">
                            <v-icon color="#FFC633" size="x-small">mdi mdi-star</v-icon>
                            <v-icon color="#FFC633" size="x-small">mdi mdi-star</v-icon>
                            <v-icon color="#FFC633" size="x-small">mdi mdi-star</v-icon>
                            <v-icon color="#FFC633" size="x-small">mdi mdi-star</v-icon>
                            <v-icon color="#FFC633" v-if="4.56 < 5 && 4.56 > 4" size="x-small">mdi
                                mdi-star-half</v-icon>
                            <div
                                style="font-family:'Satoshi',sans-serif;font-weight: 400;font-size: 14px;line-height: 18.9px;">
                                4.5/5
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div
                    style="font-family:'Satoshi',sans-serif;font-weight: 700;font-size: 24px;line-height: 32.4px;color: #000000;">
                    $120
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
</script>

<style ></style>