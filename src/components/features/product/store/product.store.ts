import { defineStore } from "pinia";
import {productApi} from '../services/product.api'
import { IProduct } from "./interface";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { closeLoading, showErrorNotification, showLoading, showSuccessNotification } from '@/common/helpers';
export const ProductStore = defineStore('productStore', () => {
    async function getProducts(){
    showLoading(true)
       try{
        const res=await productApi._getList<IProduct>(DEFAULT_COMMON_LIST_QUERY);
        if(res.success){
            return {
                items:res.data.items,
                totalItems:res.data.totalItems
            };
        }
        else{
            showErrorNotification(res.message);
            return {items:[],totalItems:1}
        }
        return null;
       }catch(error){
        console.error(error);
    }finally{
        closeLoading(false);
    }
    }
    async function createProduct(data:FormData){
    showLoading(true)
    try{
        const res=await productApi._createProduct(data);
        if(res.success){
            showSuccessNotification(res.message)
            return res.data;
        }
        showErrorNotification(res.error);
    }catch(error){
        console.log('1');
        console.log(error);
    }finally{
        closeLoading(false);
    }
    }
    async function updateProduct(id:any,data:FormData){
        showLoading(true)
        try{
            const res = await productApi._updateProduct(id,data);
            if(res.success){
                showSuccessNotification(res.message);
            }
        }catch(error){
            console.log(error);
        }finally{
            closeLoading(false);
        }
    }
    async function deleteProduct(id:any) {
    showLoading(true)
        try{
            const res = await productApi._deleteProduct(id);
            if(res.success){
                showSuccessNotification(res.message);
            }
        }catch(error)  {
            console.error(error);
        }finally{
            closeLoading(false);
        }
    }

    return {
        getProducts,
        createProduct,
        deleteProduct,
        updateProduct
      };
});