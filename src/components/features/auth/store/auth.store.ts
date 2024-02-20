import localStorageAuthService from '@/common/storages/authStorage';
import { defineStore } from 'pinia';
import { authApi } from '../services/auth.api';
import type { IBodyLogin } from '../interfaces';
import { computed } from 'vue';
import dayjs from '@/plugins/dayjs';

export const useAuthStore = defineStore('authStore', () => {
  // profile name, email, etc


  async function login(body: IBodyLogin) {
    const res = await authApi.login(body);
    console.log(res.data);
    if (res.success) {
      localStorageAuthService.setAccessToken(res.data?.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(res.data?.expiresIn);
      localStorageAuthService.setRefeshToken(res.data?.refresh_token);
      localStorageAuthService.setRefeshTokenExpiredAt(res.data?.refresh_expiresIn);
      localStorageAuthService.setUserRole(res.data.profile.role);
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
