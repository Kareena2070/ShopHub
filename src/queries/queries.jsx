
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"

import *as api from '../api/api'

export const useProducts = ()=>{
    useQuery({
        queryKey: ['product'],
        queryFn: api.getProducts,
    })
}
    

export const useProductById = (id) =>{
    useQuery({
        queryKey: ['product', id],
        queryFn: ()=> api.getElementById(id),
        enabled: !!id,
    })
}
   

export const useCart = ()=>{
    useQuery({
        queryKey: ["cart"],
        queryFn: ()=> api.getCartItems(),
    })
}
    
export const useAddToCart = ()=>{
    const qc = useQueryClient();
    return useMutation({
        mutationFn: api.addToCart,
        onSuccess: ()=> qc.invalidateQueries({queryKey:['cart']})
    })
}

export const useUpdateCartItem = ()=>{
    const qc = useQueryClient()
    return useMutation({
        mutationFn: api.updateCartItem,
        onSuccess: ()=> qc.invalidateQueries({queryKey: ['cart']}),
    })
}

export const useDeleteCartItem = ()=>{
    const qc = useQueryClient()
    return useMutation({
        mutationFn: api.deleteCartItem,
        onSuccess: ()=> qc.invalidateQueries({queryKey: ['cart']}),
    })
}