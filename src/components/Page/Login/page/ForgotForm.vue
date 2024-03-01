<template>
    <div>
        <v-card class="mx-auto pa-12 pb-8 my-6" variant="flat" max-width="500" rounded="lg">
            <v-img class="mx-auto my-6" max-width="100" :src="image"></v-img>
            <div class="text-h4 text-center" style="font-size: 32px;font-weight: 400;">
                Quên mật khẩu
            </div>
            <div class="text-subtitle-1 text-medium-emphasis" v-bind="emailAttrs">Email</div>

            <v-text-field density="compact" v-model="email" placeholder="Nhập email" variant="outlined"></v-text-field>
            <div v-show="errors.email" text-subtitle-1 text-medium-emphasis class="mb-4" style="color: red;">{{ errors.email
            }}</div>
            <v-btn block class="mb-8" color="#0F60FF" size="large" @click="onSubmit">
                <span class="text-capitalize">Gửi</span>
                <p class="text-lowercase"> email</p>
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
<script setup lang="ts">
import { Regex, FORM_VALIDATION } from '@/common/constants';
import image from '../../../../assets/ttlab-logo.svg';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { showErrorNotification, showSuccessNotification } from '../../../../common/helpers';
import { useAuthStore } from '../Service/authStore';
const authStore = useAuthStore();

const { errors, handleSubmit, validate, defineField } = useForm({
    validationSchema: yup.object({
        email: yup.string().required('Vui lòng nhập email').matches(
            Regex.EMAIL,
            'Email không hợp lệ'
        ),
    }),
});
const [email, emailAttrs] = defineField('email');
const onSubmit = handleSubmit(async values => {
    const res = await authStore.forgot_password(email.value)
    if (res.success) {
        showSuccessNotification(res.message);
    } else {
        showErrorNotification(res.message);
    }
});

</script>