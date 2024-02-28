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
                        <!-- <v-text-field style="background-color: white;" :disabled="isDisabled" label="Nhập email"
                            density="compact" single-line :error-messages="errors.email" v-model="email" v-bind="emailAttrs"
                            hide-details variant="outlined"></v-text-field> -->
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
                        <div class="d-flex mb-2">
                            <p>Số điện thoại</p>
                            <span class="ml-1" style="color: blue;">*</span>
                        </div>
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
                        <!-- <v-text-field label="Nhập link ảnh avatar" style="background-color: white;" density="compact"
                            v-model="file" @change="handleImageChange" v-bind="fileAttrs" single-line hide-details
                            type="file" clearable variant="outlined"></v-text-field> -->
                        <v-text-field label="Nhập link ảnh avatar" style="background-color: white;" density="compact"
                            v-model="file" @change="handleImageChange" single-line hide-details type="file" clearable
                            variant="outlined"></v-text-field>

                        <!-- <div v-show="errors.file" class="mt-2" style="color: red;">{{
                            errors.file
                        }}</div> -->
                        <div v-show="props.currentValue === '' && errors.file" class="mt-2" style="color: red;">
                            {{ props.currentValue === '' ? errors.file : '' }}
                        </div>

                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handleClose" text="Hủy" style="border: 1px solid #ccc;" width="70"></v-btn>
                <v-btn @click="createNewUser" :text="props.currentValue === '' ? 'Tạo mới' : 'Chỉnh sửa'" color="white"
                    class="mr-2" style="background-color: #0F60FF;" width="110"></v-btn>
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
import { userServiceApi } from '@/components/Admin/User/Service/user.api';
import { showSuccessNotification, showErrorNotification } from '../../../../common/helpers';
import { FORM_VALIDATION, Regex } from '../../../../common/constants';

const handleImageChange = (event) => {
    imageFile.value = event.target.files[0];
};

const { errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Vui lòng nhập tên người dùng').matches(
            /^[a-zA-ZÀ-Ỹà-ỹ ]*$/,
            'Tên không hợp lệ'
        ),
        email: yup.string().required('Vui lòng nhập email').matches(
            Regex.EMAIL,
            'Email không hợp lệ'
        ),
        birthday: yup.string().required('Vui lòng nhập ngày sinh').matches(
            /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng YYYY-MM-DD.'
        )
            .test('not-in-future', 'Ngày sinh không được qua ngày hiện tại', function (value) {
                const birthdayDate = new Date(value);
                const currentDate = new Date();
                return birthdayDate <= currentDate;
            }),
        phone: yup.string()
            .required('Vui lòng nhập số điện thoại')
            .matches(
                FORM_VALIDATION.phoneRegExp,
                'Số điện thoại không hợp lệ')
            .min(10, 'Số điện thoại không dưới 10 số')
            .max(10, 'Số điện thoại không được quá 10 số')
        ,
        file: yup
            .mixed()
            .test('custom-validation', 'Vui lòng chọn ảnh', function (value) {
                if (props.currentValue !== '') {
                    return true;
                } else {
                    return value !== undefined && value !== null && value !== '';
                }
            })

    }),
});
const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [birthday, birthdayAttrs] = defineField('birthday');
const [avatar, avatarAttrs] = defineField('avatar');
const [phone, phoneAttrs] = defineField('phone');
const [id] = defineField('id');
const [file, fileAttrs] = defineField('file');
const isDisabled = computed(() => props.currentValue !== '' ? true : false);


watch(() => props.currentValue, (newValue, oldValue) => {
    if (newValue === '') {
        resetForm();
    } else {
        imageFile.value = '';
        file.value = '';
        name.value = newValue.name;
        birthday.value = newValue.birthday;
        email.value = newValue.email;
        avatar.value = newValue.avatar;
        phone.value = newValue.phone;
        id.value = newValue.id;
    }
});
const showErrors = (errors: string[]) => {
    errors.forEach((message, index) => {
        setTimeout(() => {
            showErrorNotification(message);
        }, index * 1000);
    });
};

const handleClose = () => {
    // resetForm();
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
            const res = await userServiceApi.createUser(formData);
            if (res.success) {
                showSuccessNotification(res.message)
            } else {

                showErrorNotification(res.message)

                // showErrors(res.message)
                // res.status === 400 ? showErrorNotification(res.message) : showErrorNotification(res.message)
            }
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('birthday', values.birthday);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('file', imageFile.value);
            const res = await userServiceApi.updateUser(id.value, formData);
            if (res.success) {
                showSuccessNotification(res.message)
            } else {
                // showErrors(res.message)
                showErrorNotification(res.message)
            }
        }
    } catch (error) {
        console.error('Error creating product:', error);

    } finally {
        resetForm();
        handleClose();
        imageFile.value = '';
        file.value = '';
        emit('updateData');
    }
});

</script>
<style></style>