<template>
    <div class="py-6 px-3">
        <v-row>
            <!-- <v-btn width="304px" height="56px" variant="outlined">
                <v-icon src="../../assets/icon/pets.png"></v-icon>
                Departments</v-btn> -->
            <div style="height: 56px; width: 304px; border: 1px solid #9DC2FF;border-radius: 10px;cursor: pointer;"
                class="d-flex align-center justify-space-between">
                <v-img src="../../assets/icon/filter-variant.png"
                    style="width: 32px; height: 32px; margin-right: 8px;"></v-img>
                <div
                    style="width: 232px;text-align: center;font-family: 'Quicksand', sans-serif;font-size: 24px;line-height: 36px;font-weight: 700;color: #2264D1;">
                    Departments
                </div>
            </div>
            <div>
                <v-list style="width: 310px;">
                    <v-list-group value="Users">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" title="All Categories"
                                style="color: #19191D;font-size: 16px;line-height: 24px;font-weight: 400;font-family: 'Inter', sans-serif;">
                                <v-list-item-subtitle
                                    style="color: #787885;font-size: 14px;line-height: 20.02px;font-weight: 400;font-family: 'Inter', sans-serif;">Ecommerce
                                    patterns</v-list-item-subtitle>
                            </v-list-item>
                        </template>
                    </v-list-group>
                    <v-list-group value="Electronics">

                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" title="Electronics"
                                style="color: #19191D;font-size: 16px;line-height: 24px;font-weight: 400;font-family: 'Inter', sans-serif;">
                            </v-list-item>
                        </template>

                        <v-list-group value="Cell Phones & Smartphones" style="min-width: 300px;font-size: 16px;">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" title="Cell Phones & Smartphones"
                                    style="min-width: 300px;font-size: 16px;"></v-list-item>
                            </template>

                            <v-list-item v-for="(i, index) in admins" :key="index">
                                <v-list-item-title>{{ i.value }}</v-list-item-title>
                                <v-btn v-if="i.icon" variant="tonal" :append-icon="i.icon" color="#EBF2FF"
                                    style="color: #2264D1;" class="d-flex justify-end text-capitalize">Show more</v-btn>
                            </v-list-item>
                        </v-list-group>

                        <v-list-group value="Business & Industrial">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" title="Business & Industrial"></v-list-item>
                            </template>
                        </v-list-group>

                        <v-list-group value="Computers">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" title="Computers"
                                    subtitle="Tablets & Networking"></v-list-item>
                            </template>
                        </v-list-group>

                        <v-list-group value="Consumer Electroinics">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" title="Consumer Electroinics"></v-list-item>
                            </template>
                        </v-list-group>

                        <v-list-group value="Home & Garden">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" title="Home & Garden"></v-list-item>
                            </template>
                        </v-list-group>

                        <v-list-group value="Collectibles">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" title="Collectibles"></v-list-item>
                            </template>
                        </v-list-group>
                        <v-btn variant="tonal" color="#EBF2FF" style="color: #2264D1;"
                            class="d-flex justify-end ml-7 text-capitalize">Expand</v-btn>
                    </v-list-group>
                </v-list>
            </div>
            <div>
                <!-- <v-list>
                    <v-list-group style="background-color: #F7F7FA;width: 304px;">

                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" color="primary">
                                <p style="color: #19191D; font-weight: 500;">Expanded Filters</p>
                            </v-list-item>
                        </template>
                    </v-list-group>
                </v-list> -->
                <v-btn style="min-width: 304px;height: 40px;" class="d-flex justify-space-between"
                    append-icon="mdi-chevron-down" elevation="1">
                    <span class="text-capitalize">Collapsed filters</span>
                </v-btn>
                <div class="mt-4">
                    <v-list>
                        <v-list-group style="background-color: #F7F7FA;">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" color="primary">
                                    <p style="color: #19191D; font-weight: 500;">Expanded Filters</p>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="(title, i) in Expanded_Filters" :key="i">
                                <v-checkbox class="text-allcategories" color="#4A4B57" :label="title"
                                    hide-details></v-checkbox>
                            </v-list-item>
                        </v-list-group>
                    </v-list>


                    <v-list>
                        <v-list-group style="background-color: #F7F7FA;">

                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" color="primary">
                                    <p style="color: #19191D; font-weight: 500;">Year of manufacturing</p>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="(title, i) in Year_of_manufacturing" :key="i">
                                <v-checkbox class="text-allcategories" color="#4A4B57" :label="title"
                                    hide-details></v-checkbox>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </div>
            </div>
        </v-row>
    </div>
</template>

<script lang="ts">
export default {
    data: () => ({
        open: ['Users'],
        admins: [
            { value: 'Cell Phone Accessories' },
            { value: 'Cell Phone Gatgets' },
            { value: 'Applications' },
            { value: 'Smart Watches' },
            { icon: 'mdi-chevron-down' },
        ],
        cruds: [
            ['Create', 'mdi-plus-outline'],
            ['Read', 'mdi-file-outline'],
            ['Update', 'mdi-update'],
            ['Delete', 'mdi-delete'],
        ],
        Expanded_Filters: [
            "Recommended",
            "Recently Added",
            "Expiring Soon",
            "Most Rated",
            "Price: Low → High",
            "Price: High → Low"
        ],
        Year_of_manufacturing: [
            "1954", "1955", "1956", "1957", "1958", "1959", "19560-2020"
        ]
    }),
}
</script>

<style scoped>
.v-list-item__append {
    align-items: center !important;
    align-self: center !important;
}
</style>