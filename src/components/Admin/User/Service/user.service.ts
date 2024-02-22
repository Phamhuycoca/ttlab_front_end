import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
import { useLoadingStore } from "@/store/loading.store";
import { computed, onMounted, reactive, ref } from "vue";
import { IUser } from "./user.interface";
import { userServiceApi } from "./user.api";
export const useUser=()=>{
    const loading=useLoadingStore()
    const users = ref<IUser[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    const fetchUsers = async () => {
        try {
          loading.openLoading(true)
          const res = await userServiceApi._getList<IUser>(query);
          if(res.success)
          {
            return {
                items:res.data.items,
              totalItems:res.data.totalItems
            }
          }
          return {
            items:[],
              totalItems:1
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }finally{
          loading.openLoading(false)
        }
      };
      const searchUsers = async () => {
        try {
          const res = await userServiceApi._getList<IUser>(query);
          if(res.success)
              return res.data.items
          return null
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    return{
        users,
        fetchUsers,
        query,
        searchUsers
    }
}