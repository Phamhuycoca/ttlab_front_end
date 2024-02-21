import { defineStore } from "pinia";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { closeLoading, showErrorNotification, showLoading, showSuccessNotification } from '@/common/helpers';
import { IUser } from "./interface";
import { userApi } from "../service/user.api";
import router from './../../../../router/index';
export const userStore = defineStore('userStore', () => {
    async function getUsers(){
    showLoading(true)
       try{
        const res=await userApi._getList<IUser>(DEFAULT_COMMON_LIST_QUERY);
        if(res.success){
            return {
                items:res.data.items,
                totalItems:res.data.totalItems
            };
        }else{
            // if(res.status ===419){
            //     return router.push('/login');
            // }else if(res.status ===401){
            showErrorNotification(res.message);

                return {items:[],totalItems:1}
            // }
        }
       }catch(error){
        console.error(error);
    }finally{
        closeLoading(false);
    }
    }
    async function createUser(data:FormData){
    showLoading(true)
    try{
        const res=await userApi._createUser(data);
        console.log(res);
        if(res.success){
            showSuccessNotification(res.message)
            return res.data;
        }else{
            showErrorNotification(res.data.error);
        }
    }catch(error){
        console.log('1');
        console.log(error);
    }finally{
        closeLoading(false);
    }
    }
    async function updateUser(id:any,data:FormData){
        showLoading(true)
        try{
            const res = await userApi._updateUser(id,data);
            if(res.success){
                showSuccessNotification(res.message);
            }else{
            showErrorNotification(res.data.error);

            }
        }catch(error){
            console.log(error);
        }finally{
            closeLoading(false);
        }
    }
    async function deleteUser(id:any) {
    showLoading(true)
        try{
            const res = await userApi._deleteUser(id);
            if(res.success){
                showSuccessNotification(res.message);
            }else{
            showErrorNotification(res.data.error);

            }
        }catch(error)  {
            console.error(error);
        }finally{
            closeLoading(false);
        }
    }

    return {
        getUsers,
        createUser,
        deleteUser,
        updateUser
      };
});