import type { IBodyResponse, ICommonListQuery, IGetListResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';

class UserApiService extends ApiService {
  _createUser(data:FormData): Promise<IBodyResponse<IBodyResponse<FormData>>>{
    return this.client.post(`${this.baseUrl}`,data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  _updateUser(id:any,data:FormData): Promise<IBodyResponse<IBodyResponse<FormData>>>{
    return this.client.put(`${this.baseUrl}/${id}`,data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  _deleteUser(id:any): Promise<IBodyResponse<IBodyResponse<any>>>{
    return this.client.delete(`${this.baseUrl}/${id}`);
  }
}

export const userApi = new UserApiService({ baseUrl: '/user' }, axiosInstance);
