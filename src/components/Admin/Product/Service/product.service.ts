import { useLoadingStore } from "@/store/loading.store";
import { computed, onMounted, reactive, ref } from "vue";
import { productServiceApi } from "./product.api";
import { IProduct } from "./product.interface";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";
export const useProduct = () => {
    const loading=useLoadingStore()
    const products = ref<IProduct[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    const fetchProducts = async () => {
      try {
        loading.openLoading(true)
        const res = await productServiceApi._getList<IProduct>(query);
        // console.log(res.items)
        if(res.success)
          return {
            items:res.data.items,
            totalItems:res.data.totalItems
          }
          return {
            items:[],
            totalItems:1
          }
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally{
        loading.openLoading(false)
      }
    };
    const searchProducts = async () => {
      loading.openLoading(true);
      try {
        const res = await productServiceApi._getList<IProduct>(query);
        if(res.success)
            return {
              items:res.data.items,
              totalItems:res.data.totalItems
            }
            return {
                items:[],
                totalItems:1
              }
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally{
      loading.openLoading(false);
      }
    };
  return {
    products,
    fetchProducts,
    query,
    searchProducts,
  };
};
