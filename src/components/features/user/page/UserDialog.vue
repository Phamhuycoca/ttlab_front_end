<template>
    <v-dialog max-width="500px" v-model="dialog">
        <v-card>
            <v-card-title style="font-weight: bold;">
                <h4>{{ props.currentValue === '' ? 'Tạo mới người dùng' : 'Chỉnh sửa người dùng' }}</h4>
            </v-card-title>
            <v-container style="background-color: rgb(247, 247, 247);">
                <v-row>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Tên người dùng</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field style="background-color: white;" label="Nhập tên người dùng" density="compact"
                            :error-messages="errors.name" required v-model="name" v-bind="nameAttrs" single-line
                            hide-details variant="outlined"></v-text-field>
                        <div v-show="errors.name" class="mt-2" style="color: red;">{{
                            errors.name
                        }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Email</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field style="background-color: white;" label="Nhập email" density="compact" single-line
                            :error-messages="errors.email" v-model="email" v-bind="emailAttrs" hide-details
                            variant="outlined"></v-text-field>
                        <div v-show="errors.email" class="mt-2" style="color: red;">{{
                            errors.email
                        }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Ngày sinh</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field style="background-color: white;" type="date" density="compact" single-line
                            v-model="birthday" v-bind="birthdayAttrs" hide-details variant="outlined"
                            :error-messages="errors.birthday"></v-text-field>
                        <div v-show="errors.birthday" class="mt-2" style="color: red;">{{
                            errors.birthday
                        }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Số điện thoại</p>
                        <v-text-field style="background-color: white;" label="Nhập số điện thoại" density="compact"
                            v-model="phone" v-bind="phoneAttrs" single-line hide-details variant="outlined"></v-text-field>
                        <div v-show="errors.phone" class="mt-2" style="color: red;">{{
                            errors.phone
                        }}</div>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <div class="d-flex mb-2">
                            <p>Avatar</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
                        <v-text-field label="Nhập link ảnh avatar" style="background-color: white;" density="compact"
                            v-model="file" @change="handleImageChange" single-line hide-details type="file" clearable
                            variant="outlined"></v-text-field>
                        <!-- <div v-show="errors.avatar" class="mt-2" style="color: red;">{{
                            errors.avatar
                        }}</div> -->
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handleClose" text="Hủy" style="border: 1px solid #ccc;" width="70"></v-btn>
                <v-btn @click="createNewUser" text="Tạo mới" color="white" class="mr-2" style="background-color: #0F60FF;"
                    width="110"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
const dialog = ref(false);
import { useForm } from 'vee-validate';
import * as yup from 'yup';
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const props = defineProps(['close', 'currentValue']);
const emit = defineEmits();
const imageFile = ref(null);
import { userStore } from '../store/user.store'
const userUse = new userStore();
const handleImageChange = (event) => {
    const file = event.target.files[0];
    imageFile.value = file;
};

const { errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Vui lòng nhập tên người dùng'),
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        birthday: yup.string().required('Vui lòng nhập ngày sinh'),
        phone: yup.string().matches(regexPhoneNumber, 'Số điện thoại không hợp lệ'),
    }),
});
const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [birthday, birthdayAttrs] = defineField('birthday');
const [avatar, avatarAttrs] = defineField('avatar');
const [phone, phoneAttrs] = defineField('phone');
const [id] = defineField('id');
const [file] = defineField('file');



watch(() => props.currentValue, (newValue, oldValue) => {
    if (newValue === '') {
        resetForm();
    } else {
        name.value = newValue.name;
        birthday.value = newValue.birthday;
        email.value = newValue.email;
        avatar.value = newValue.avatar;
        phone.value = newValue.phone;
        id.value = newValue.id;
    }
});

const handleClose = () => {
    resetForm();
    emit('close');
};

const createNewUser = handleSubmit(async values => {
    try {
        if (props.currentValue == '') {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('birthday', values.birthday);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('file', imageFile.value);
            formData.append('password', '12345678');
            const res = await userUse.createUser(formData);
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('birthday', values.birthday);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('file', imageFile.value);
            formData.append('id', id.value);
            const res = await userUse.updateUser(id.value, formData);
        }
    } catch (error) {
        console.error('Error creating product:', error);

    } finally {
        handleClose();
        emit('updateData');
    }
});

</script>
<style></style>