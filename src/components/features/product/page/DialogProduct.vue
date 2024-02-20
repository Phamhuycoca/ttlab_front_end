
<template>
    <v-dialog max-width="500px" v-model="dialog">
        <v-card>
            <v-card-title style="font-weight: bold;">
                <h4>{{ props.currentValue === '' ? 'Tạo mới sản phẩm' : 'Chỉnh sửa sản phẩm' }}</h4>
            </v-card-title>
            <v-container style="background-color: rgb(247, 247, 247);">
                <v-row>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Tên sản phẩm</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field style="background-color: white;" label="Nhập tên sản phẩm" density="compact"
                            single-line hide-details variant="outlined" v-model="name"></v-text-field>
                        <div v-show="errors.name" text-subtitle-1 text-medium-emphasis class="mt-2 ml-2"
                            style="color: red;">{{
                                errors.name
                            }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Giá</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field style="background-color: white;" label="Nhập giá sản phẩm" density="compact"
                            single-line hide-details variant="outlined" v-model="price" type="number"></v-text-field>
                        <div v-show="errors.price" text-subtitle-1 text-medium-emphasis class="mt-2 ml-2"
                            style="color: red;">{{
                                errors.price
                            }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Số lượng</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field style="background-color: white;" label="Nhập số lượng sản phẩm" density="compact"
                            single-line hide-details variant="outlined" v-model="quantity" type="number"></v-text-field>
                        <div v-show="errors.quantity" text-subtitle-1 text-medium-emphasis class="mt-2 ml-2"
                            style="color: red;">{{
                                errors.quantity
                            }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Mô tả</p>
                        <v-textarea style="background-color: white;" label="Nhập mô tả" density="compact" single-line
                            hide-details variant="outlined" v-model="description"></v-textarea>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Ảnh sản phẩm</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field placeholder="Nhập link ảnh sản phẩm" style="background-color: white;"
                            density="compact" @change="handleImageChange" single-line hide-details variant="outlined"
                            clearable type="file" v-model="file"></v-text-field>
                        <div v-show="errors.file" text-subtitle-1 text-medium-emphasis class="mt-2 ml-2"
                            style="color: red;">{{
                                errors.file
                            }}</div>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handleClose" text="Hủy" style="border: 1px solid #ccc;" width="70"></v-btn>
                <v-btn :text="props.currentValue === '' ? 'Tạo mới' : 'Chỉnh sửa'" @click="createProduct" color="white"
                    class="mr-2" style="background-color: #0F60FF;" width="110"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ProductStore } from '../store/product.store'

const productStore = new ProductStore();
const props = defineProps(['close', 'currentValue']);
const emit = defineEmits();
console.log(props.currentValue);
const createValidationSchema = () => {
    if (props.currentValue === '') {
        return yup.object({
            name: yup.string().required('Vui lòng nhập tên sản phẩm'),
            price: yup.string().required('Vui lòng nhập giá'),
            quantity: yup.string().required('Vui lòng nhập số lượng'),
            file: yup.string().required('Vui lòng nhập ảnh sản phẩm'),
        });
    } else {
        return yup.object({
        });
    }
};


const {
    errors,
    handleSubmit,
    resetForm,
    defineField
} = useForm({
    validationSchema: createValidationSchema(),
});

const [name, nameAttrs] = defineField('name');
const [price, priceAttrs] = defineField('price');
const [quantity, quantityAttrs] = defineField('quantity');
const [file, fileAttrs] = defineField('file');
const [description] = defineField('description');
const [id] = defineField('id');

watch(() => props.currentValue, (newValue, oldValue) => {
    if (newValue === '') {
        resetForm();
    } else {
        name.value = newValue.name;
        price.value = newValue.price;
        description.value = newValue.description;
        quantity.value = newValue.quantity;
        id.value = newValue.id;
    }
});

const handleClose = () => {
    resetForm();
    emit('close');
};

const imageFile = ref(null);

const handleImageChange = (event) => {
    const file = event.target.files[0];
    imageFile.value = file;
};

const createProduct = handleSubmit(async values => {
    try {
        if (props.currentValue == '') {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('quantity', values.quantity);
            formData.append('description', values.description);
            formData.append('file', imageFile.value);
            const res = await productStore.createProduct(formData);
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('quantity', values.quantity);
            formData.append('description', values.description);
            formData.append('file', imageFile.value);
            formData.append('id', id.value);
            const res = await productStore.updateProduct(id.value, formData);
        }
    } catch (error) {
        console.error('Error creating product:', error);
    } finally {
        handleClose();
        emit('updateData');
    }
});
</script>
