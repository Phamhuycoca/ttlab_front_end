import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import { IBodyLogin, ILoginResponse } from './interfaces';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/login`, body);
  }
  forgot(email:string): Promise<IBodyResponse<ILoginResponse>>{
    const formdata=new FormData();
    formdata.append('email',email);
    return this.client.post(`${this.baseUrl}/forgot-password`, formdata,{
      headers: {
        'Content-Type': 'application/json' 
      },
    });
  }
  register(data:any): Promise<IBodyResponse<any>>{
    console.log(data);
    const formdata=new FormData();
    formdata.append('email',data.email);
    formdata.append('name',data.name);
    formdata.append('password',data.password);
    return this.client.post(`${this.baseUrl}/register`, formdata);
  }


  logout(): Promise<IBodyResponse<Record<string, unknown>>> {
    return this.client.post(`${this.baseUrl}/logout`);
  }
  _getOwnProfile<R>(): Promise<IBodyResponse<R>> {
    return this.client.get('/user/my-profile');
  }
}
export const authApi = new AuthApiService({ baseUrl: '/auth' }, axiosInstance);