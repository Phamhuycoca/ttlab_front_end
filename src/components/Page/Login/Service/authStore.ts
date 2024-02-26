import localStorageAuthService from '@/common/storages/authStorage';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import dayjs from '@/plugins/dayjs';
import { authApi } from './auth.api';
import { IBodyLogin } from './interfaces';
import { showErrorNotification } from '@/common/helpers';

export const useAuthStore = defineStore('authStore', () => {
  // profile name, email, etc


  async function login(body: IBodyLogin) {
    const res = await authApi.login(body);
    // console.log(res.data.data.profile.role);
    if (res.success) {
      localStorageAuthService.setAccessToken(res.data?.data.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(res.data?.data.expiresIn);
      localStorageAuthService.setRefeshToken(res.data?.data.refresh_token);
      localStorageAuthService.setRefeshTokenExpiredAt(res.data?.data.refresh_expiresIn);
      localStorageAuthService.setUserRole(res.data.data.profile.role);
    } 
    return res;
  }
  const isAuthenticated = computed(() => {
    const token = localStorageAuthService.getAccessToken();
    const expiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    return Boolean(token && expiredAt && !dayjs(dayjs(expiredAt)).isBefore());
  });
  const hasToken = computed(() => {
    return !!localStorageAuthService.getAccessToken();
  });
  return {
    login,
    hasToken,
    isAuthenticated,
  };
});