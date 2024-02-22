import { PageName, Role } from "@/common/constants";
import { showWarningsNotification } from "@/common/helpers";
import localStorageAuthService from "@/common/storages/authStorage";
import dayjs from "@/plugins/dayjs";
import { get } from "lodash";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
export default async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  
    const role = localStorageAuthService.getUserRole();
    const IS_PUBLIC = to?.meta?.public || false;
    // const onlyWhenLoggedOut = to?.meta?.onlyWhenLoggedOut || false;
    const hasToken = localStorageAuthService.getAccessToken() ? true : false;
    const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), 'second');
    const isExpiredRefresh=dayjs().isAfter(dayjs(localStorageAuthService.getAccessTokenExpiredAt()),'second')
    const RoleRouter=to?.meta?.role || Role.USER
    const IS_AUTHENTICATED = tokenExpiredAt && !isExpired && hasToken;

  if(to.name === PageName.LOGIN_PAGE)
  {
    localStorageAuthService.resetAll()
  }
  if(IS_PUBLIC)
  {
    return next()
  }
  if (!IS_AUTHENTICATED && to.name !== PageName.LOGIN_PAGE && !IS_PUBLIC) {
    sessionStorage.setItem('redirect', to.fullPath);
    if(isExpiredRefresh)
    {
      showWarningsNotification("Hết phiên đăng nhập. Vui lòng đăng nhập lại")
      return next({ name: PageName.LOGIN_PAGE });
    }
    else
    {
      return next()
    }
  }
  if (!IS_PUBLIC) {
    if (IS_AUTHENTICATED) {
      if (role===RoleRouter) {
        return next();
      } else {
        return next({ name: PageName.NOT_FOUND_PAGE });
      }
    }
  }
  if (!IS_PUBLIC && !IS_AUTHENTICATED) {
    return next({
      name: PageName.LOGIN_PAGE,
    });
  }
  return next();
};