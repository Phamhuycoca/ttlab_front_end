<script setup lang="ts">
import { showSuccessNotification, showWarningsNotification, showErrorNotification } from '../../../../common/helpers'
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import axios from 'axios';
import * as yup from 'yup';
import { useAuthStore } from '../store/auth.store'
const authStore = useAuthStore();

const visible = ref(false);
const terms = ref(false);
import image from '../../../../assets/ttlab-logo.svg';
import router from '../../../../router';
const { errors, handleSubmit, validate, defineField } = useForm({
    validationSchema: yup.object({
        email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
        password: yup.string().min(6, 'Mật khẩu phải trên 6 kí tự').required('Mật khẩu không được để trống'),
    }),
});
const onSubmit = handleSubmit(async values => {
    const res = await authStore.login({ email: values.email, password: values.password })
    if (res.success) {
        showSuccessNotification('Đăng nhập thành công')
        router.push('/admin')
        return true;
    }
    return false;
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
</script>

<template>
    <div>
        <v-card class="mx-auto pa-12 pb-8 my-6" variant="flat" max-width="500" rounded="lg">
            <v-img class="mx-auto my-6" max-width="100" :src="image"></v-img>
            <div class="text-h4 text-center">
                Đăng nhập
            </div>
            <div class="text-subtitle-1 text-medium-emphasis" v-bind="emailAttrs">Email</div>

            <v-text-field density="compact" v-model="email" placeholder="Nhập email" variant="outlined"></v-text-field>
            <div v-show="errors.email" text-subtitle-1 text-medium-emphasis class="mb-4" style="color: red;">{{ errors.email
            }}</div>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Mật khẩu
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Nhập mật khẩu" variant="outlined" @click:append-inner="visible = !visible"
                v-model="password"></v-text-field>
            <div v-show="errors.password" text-subtitle-1 text-medium-emphasis class="mb-4" style="color: red;">{{
                errors.password }}</div>
            <div class="d-flex justify-space-between align-center">
                <v-checkbox v-model="terms" color="secondary" label="Ghi nhớ Đăng nhập"></v-checkbox>
                <a class="text-caption text-decoration-none text-blue mb-6">
                    Quên mật khẩu?</a>
            </div>
            <v-btn block class="mb-8" color="#0F60FF" size="large" @click="onSubmit">
                Đăng nhập
            </v-btn>
            <div class="text-center">
                Bạn chưa có tài khoản ?
                <a class="text-decoration-none text-center" style="color:#0F60FF;">
                    Đăng ký ?
                </a>
            </div>
        </v-card>
    </div>
</template>
<style></style>