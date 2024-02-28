<script setup lang="ts">
import { showSuccessNotification, showWarningsNotification, showErrorNotification } from '../../../../common/helpers'
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import axios from 'axios';
import * as yup from 'yup';
import { useAuthStore } from '../Service/authStore'
const authStore = useAuthStore();

const visible = ref(false);
const terms = ref(false);
import image from '../../../../assets/ttlab-logo.svg';
import router from '../../../../router';
import localStorageAuthService from '../../../../common/storages/authStorage';
import { Role, FORM_VALIDATION, Regex } from '../../../../common/constants';
const { errors, handleSubmit, validate, defineField } = useForm({
    validationSchema: yup.object({
        email: yup.string().required('Vui lòng nhập email').matches(
            Regex.EMAIL,
            'Email không hợp lệ'
        ),
        password: yup.string().required('Vui lòng nhập mật khẩu').min(FORM_VALIDATION.passwordMinLength, 'Mật khẩu tối thiểu 8 kí tự').max(FORM_VALIDATION.textMaxLength, 'Mật khẩu không quá 30 kí tự').matches(Regex.PASSWORD, 'Mật khẩu phải có ít nhất 1 số hoặc chữ'),
    }),
});
const onSubmit = handleSubmit(async values => {
    const res = await authStore.login({ email: values.email, password: values.password })
    if (res.success) {
        const role = localStorageAuthService.getUserRole();
        if (role === Role.ADMIN.toString()) {
            setTimeout(() => {
                showSuccessNotification('Đăng nhập thành công')
                router.push('/admin')
            }, 1000)
        } else {
            setTimeout(() => {
                showSuccessNotification('Đăng nhập thành công')
                router.push('/')
            }, 1000)
        }
    } else {
        showErrorNotification(res.message);
    }
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
</script>

<template>
    <div>
        <v-card class="mx-auto pa-12 pb-8 my-6" variant="flat" max-width="500" rounded="lg">
            <v-img class="mx-auto my-6" max-width="100" :src="image"></v-img>
            <div class="text-h4 text-center" style="font-size: 32px;font-weight: 400;">
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
                density="compact" placeholder="••••••••••••••" variant="outlined" @click:append-inner="visible = !visible"
                v-model="password"></v-text-field>
            <div v-show="errors.password" text-subtitle-1 text-medium-emphasis style="color: red;">{{
                errors.password }}</div>
            <div class="d-flex justify-space-between align-center">
                <div class="mb-6 d-flex justify-space-between align-center">
                    <input type="checkbox" class="mx-auto mr-2"
                        style="width: 16px;height: 16px;border: 1px solid #FFFFFF; border-radius: 4px;" />
                    <div style="font-weight: 500;font-size: 14px;line-height: 20px;">
                        Ghi nhớ Đăng nhập
                    </div>
                </div>
                <!-- <v-checkbox v-model="terms" color="secondary" label="Ghi nhớ Đăng nhập"></v-checkbox> -->
                <a class="text-caption text-decoration-none mb-6"
                    style="font-weight: 600;font-size: 16px;line-height: 20px;color: #0F60FF;">
                    Quên mật khẩu?</a>
            </div>
            <v-btn block class="mb-8" color="#0F60FF" size="large" @click="onSubmit">
                <span class="text-capitalize">Đăng</span>
                <p class="text-lowercase"> nhập</p>
            </v-btn>
            <div class=" d-flex align-center justify-center">
                <div style="font-size: 14px;font-weight: 400;line-height: 20px;">
                    Bạn chưa có tài khoản?
                </div>
                <a class="text-decoration-none text-center ml-1"
                    style="font-weight: 600;font-size: 14px;line-height: 20px;color:#0F60FF;">
                    Đăng ký
                </a>
            </div>
        </v-card>
    </div>
</template>
<style scoped>
* {
    font-family: 'Public Sans', sans-serif;
}
</style>