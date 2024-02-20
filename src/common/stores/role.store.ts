import { defineStore } from 'pinia';
import { computed } from 'vue';
import localStorageAuthService from '../storages/authStorage';

export const useRole = defineStore('role-store', () => {
  const _role = computed(() => {
    const role = localStorageAuthService.getUserRole();
    return role;
  });
  const user = computed(() => {
    return _role.value.user;
  });



  const role = computed(() => {
    return _role.value.role;
  });
  return {
    user,
    role,
  };
});
