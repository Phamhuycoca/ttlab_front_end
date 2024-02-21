<template>
    <div>
        <div class="py-6 px-6">
            <v-row>
                <v-col cols="6" sm="12" md="6" lg="2">
                    <v-row>
                        <v-select class="ma-2" label="SORT BY" :items="selectBy" v-model="selectedValue" density="compact"
                            variant="outlined"></v-select>
                    </v-row>
                </v-col>
                <v-col cols="6" sm="12" md="6" lg="2">
                    <v-row>
                        <v-select class="ma-2" label="Condition" :items="selectStatus" v-model="status" item-value="value"
                            item-title="text" density="compact" variant="outlined"></v-select>
                    </v-row>
                </v-col>
                <v-col cols="6" sm="12" md="6" lg="2">
                    <v-row>
                        <v-select class="ma-2" label="Delivery options" :items="selectPrice" v-model="price"
                            density="compact" variant="outlined"></v-select>
                    </v-row>
                </v-col>
                <v-spacer></v-spacer>



                <v-col cols="12" sm="12" md="8" lg="6">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn class="text-capitalize font-weight-regular mt-2" variant="text" size="large"
                            style="background-color: #EBF2FF;">Show
                            all</v-btn>
                        <v-btn class="text-capitalize font-weight-regular mt-2" elevation="2" size="large"
                            style="color: #2264D1;">Auction</v-btn>
                        <v-btn class="text-capitalize font-weight-regular mt-2 mr-4" variant="text" size="large"
                            style="background-color: #EBF2FF;">But
                            now</v-btn>
                        <v-btn class="mt-2 ml-4" variant="text" size="large" style="background-color: #EBF2FF;">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                        <v-btn class="mt-2" size="large">
                            <v-icon>mdi-microsoft-windows</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </div>

        <div>
            <v-row class="ml-1">
                <h3 class="ma-5 font-weight-regular">Releted</h3>
                <v-chip-group v-for="(chip, index) in chips" :key="index">
                    <v-chip class="ma-2" size="x-large">{{ chip }}</v-chip>
                </v-chip-group>
            </v-row>
        </div>

        <div class="ma-4">
            <CardItem :selectedValue="selectedValue" :status="status" :price="price" />
        </div>

        <div class="ml-4 mr-4 mt-10 mb-10">
            <Footer />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import CardItem from '../common/Element/CardItem.vue'
import Footer from '../components/layouts/Footer.vue'
const chips = reactive(['worldwide shipping', 'under $50', 'kitten', 'plastic plugs', 'pucker shoes', 'vintage typewriter'])
const selectBy = reactive(['Tất cả', 'Giày', 'Quần', 'Áo'])
const selectStatus = reactive([
    { text: 'Tất cả', value: '' },
    { text: 'Giảm 50%', value: 0 },
    { text: 'Cool deal', value: 1 },
])
const selectPrice = reactive(['Tất cả', 'Từ thấp đến cao', 'Từ cao đến thấp']);
const selectedValue = ref('')
const status = ref('');
const price = ref('');
//console.log(status.value)
// watch(() => status.value, (newValue) => {
//   console.log(newValue);
// });
</script>
  
  
<style scoped>
* {
    font-family: 'Epilogue', sans-serif;
    font-family: 'Inter', sans-serif;
}
</style>