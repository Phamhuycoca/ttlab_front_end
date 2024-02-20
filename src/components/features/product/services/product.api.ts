import type { IBodyResponse, ICommonListQuery, IGetListResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';

class ProductApiService extends ApiService {
  _createProduct(data:FormData): Promise<IBodyResponse<IBodyResponse<any>>>{
    return this.client.post(`${this.baseUrl}`,data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export const productApi = new ProductApiService({ baseUrl: '/product' }, axiosInstance);
