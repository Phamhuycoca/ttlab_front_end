<template>
    <div>
        <v-card>
            <v-row>
                <v-col cols="12" sm="12" lg="3" v-for="(item, index) in filteredItems" :key="index"
                    style="display: flex;justify-content: center;" class="mt-4 mb-4">
                    <v-card variant="flat" hover min-height="472px" width="259px">
                        <v-img cover class="mx-auto" width="226" height="224" :src="item.image"></v-img>
                        <v-card-text style="height: 74px;">
                            {{ item.title }}
                        </v-card-text>
                        <v-card-item>
                            <div style="display: flex;justify-content: space-between;">
                                <p class="font-weight-black" style="font-size:24px;">
                                    ${{ item.price }}
                                </p>
                                <div v-if="item.status === 0"
                                    style="width: 70px;height: 24px;background-color:#ECF7ED;text-align: center;margin-top: 5px;margin-right: 7px;">
                                    <span style="width: 50px; height: 16px;font-size: 12px;color: #37833B;">
                                        50% OFF
                                    </span>
                                </div>
                                <div v-if="item.status === 1"
                                    style="width: 70px;height: 24px;background-color:#FDEDF2;text-align: center;margin-top: 5px;margin-right: 7px;">
                                    <span style="width: 50px; height: 16px;font-size: 12px;color: #C23564;">
                                        Cool deal!
                                    </span>
                                </div>
                            </div>
                        </v-card-item>
                        <v-card-text style="height: 41px;font-size: 14px;">
                            {{ item.reviews }}
                        </v-card-text>
                        <v-card-actions>
                            <v-row style="margin-top: 5px;">
                                <v-col class="ml-2 mt-2" cols="5" style="display: flex;">
                                    <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
                                    <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
                                    <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
                                    <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
                                    <v-icon color="#FB8200" v-if="item.feedback == 5" size="x-small">mdi mdi-star</v-icon>
                                    <v-icon color="#FB8200" v-if="item.feedback < 5 && item.feedback > 4" size="x-small">mdi
                                        mdi-star-half</v-icon>
                                    <span style="font-size: 12px;">{{ item.feedback }}</span>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn prepend-icon="mdi-heart-outline" variant="outlined" class="text-capitalize"
                                        size="small" height="32" width="88" color="primary">Watch</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
const items = reactive([
    {
        image: "https://dashjk.vn/wp-content/uploads/2023/02/Quan-ao-gon-gang.jpg",
        title: "Quần jean nam.",
        price: "45.50",
        reviews: "Eligible for Shipping To Mars or somewhere else",
        feedback: "4.05",
        status: 0
    },
    {
        image: "https://down-vn.img.susercontent.com/file/11d024f343ffb4714c4d4bed0b11fa40",
        title: "Giày nam.",
        price: "13.95",
        reviews: "1258 bids, 359 watchers $5.95 for shipping",
        feedback: "4.56",
        status: 0

    },
    {
        image: "https://idoo.com.vn/image/cache/catalog/san-pham/ao-thun/dong-phuc-quan-an-quan-nhau/may-dong-phuc-ao-thun-quan-an-quan-nhau-03-cr-800x800.jpg",
        title: "Áo thun",
        price: "128.99",
        reviews: "Eligible for nothing :(",
        feedback: "4.87",
        status: 1
    },
    {
        image: "https://districtone.vn/wp-content/uploads/2022/09/ao-thun-trang-phoi-quan-trang-ong-suong-5.jpg",
        title: "Áo thun",
        price: "12.48",
        reviews: "Wordwide shitting available Buyers protection possible!",
        feedback: "4.99",
        status: 1

    },
    {
        image: "https://mochanstore.com/wp-content/uploads/2023/03/mochanstore.com-AO-THUN-NAM-NU-CHAT-COTTON-KHO-3158-100.-CHU-THEBEAR-QUAN-AO-THU-BIO.jpg",
        title: "Áo thun nữ",
        price: "12.48",
        reviews: "Wordwide shifting available Buyers protection possible!",
        feedback: "4.99",
        status: 1

    },
    {
        image: "https://chogym.vn/wp-content/uploads/2019/06/bo-quan-ao-tap-gym-the-thao-tham-hut-mo-hoi-11.jpg",
        title: "Quần jean nam.",
        price: "128.99",
        reviews: "Showcasing onHovered state",
        feedback: "4.87",
    },
    {
        image: "https://tatun.vn/wp-content/uploads/2020/05/ao-thun-tron-cho-nu-2.jpg",
        title: "Quần jean nữ. ",
        price: "13.95",
        reviews: "1258 bids, 359 watchers $5.95 for shipping",
        feedback: "4.56",
        status: 1
    },
    {
        image: "https://aristino.com/Data/ResizeImage/images/product/ao-thun-dai-tay/alt003w2/Ao-thun-Aristino-ALT003W2-26-1-x500x500x4.webp",
        title: "Áo dài tay nam.",
        price: "9.50",
        reviews: "Eligible for Shipping To Mars or somewhere else",
        feedback: "4.77"
    },
    {
        image: "https://bulbal.vn/wp-content/uploads/2023/12/BO-QUAN-AO-BONG-CHUYEN-NAM-BULBAL-BIOVOL-TRANG-1-scaled.jpg",
        title: "Áo ngắn tay",
        price: "128.99",
        reviews: "Eligible for nothing :(",
        feedback: "4.87"
    },
    {
        image: "https://salt.tikicdn.com/cache/w444/ts/product/f5/e3/ed/df88870c4aacbf4a4c268805064873d3.png",
        title: "Set nữ thời trang",
        price: "12.48",
        reviews: "Wordwide shifting available Buyers protection possible!",
        feedback: "4.99",
        status: 0

    },
    {
        image: "https://bizweb.dktcdn.net/100/393/147/products/247186147-4771759459524985-3979215046736333443-n-4bb355cd-066b-4961-9000-922843a80845.jpg?v=1641438640580",
        title: "Quần jean nữ.",
        price: "12.48",
        reviews: "Wordwide shifting available Buyers protection possible!",
        feedback: "4.99"
    },
    {
        image: "https://img.pddpic.com/mms-material-img/2021-05-02/4d7986a9-f2f1-4ad7-a27b-9b78b4340868.png.a.jpeg?imageView2/2/w/1300/q/80",
        title: "Set nữ xinh xắn.",
        price: "12.48",
        reviews: "Wordwide shifting available Buyers protection possible!",
        feedback: "4.99",
        status: 0

    },
    {
        image: "https://imgcdn.thitruongsi.com/tts/rs:fill:600:0:1:1/g:sm/plain/file://product/2023/03/10/876fba00-bf18-11ed-941e-d9cb445060f8.jpg",
        title: "Chân váy.",
        price: "12.48",
        reviews: "Wordwide shifting available Buyers protection possible!",
        feedback: "4.99"
    },
])
const props = defineProps(['selectedValue', 'status', 'price']);
const filteredItems = computed(() => {
    // if (props.selectedValue === 'Tất cả' || props.selectedValue === '') {
    //     return items;
    // }
    // if (props.status !== '') {
    //     console.log(items);
    //     return items.filter(item => item.status === parseInt(props.status));
    // } else {
    //     return items.filter(item => item.title.includes(props.selectedValue));
    // }
    const newItems = [...items];

    if (props.selectedValue !== 'Tất cả' && props.selectedValue !== '') {
        return newItems.filter(item => item.title.includes(props.selectedValue));
    } else if (props.status !== '') {
        console.log('item', props.status.value);
        return newItems.filter(item => item.status === parseInt(props.status));
    } else if (props.price === 'Từ thấp đến cao') {
        return newItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (props.price === 'Từ cao đến thấp') {
        return newItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
        return newItems;
    }

});
</script>

<style></style>