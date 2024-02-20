import type { IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import { IBodyLogin, ILoginResponse } from '../interfaces';
import axiosInstance from '@/plugins/axios';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/login`, body);
  }
  logout(): Promise<IBodyResponse<Record<string, unknown>>> {
    return this.client.post(`${this.baseUrl}/logout`);
  }

  _getOwnProfile<R>(): Promise<IBodyResponse<R>> {
    return this.client.get('/user/my-profile');
  }
}

export const authApi = new AuthApiService({ baseUrl: '/auth' }, axiosInstance);
