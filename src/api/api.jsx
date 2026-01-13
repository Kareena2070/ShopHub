import axios from "axios"

const api = axios.create({
    baseURL: " https://backendapi-cwp7.onrender.com/api"
});

export const getProducts = async ()=>{
    const res = await api.get('/products/');
    return res.data;
}

export const getElementById = async(id)=>{
    const res = await api.get(`/products/${id}/`);
    return res.data
}

export const getCartItems = async()=>{
    const res = await api.get("/cart/");
    return res.data
}

export const addToCart = async(item)=>{
    return api.post("/cart/", item)
}

export const updateCartItem = async({id, quantity})=>{
    return api.put(`/cart/${id}`, {quantity})
}

export const deleteCartItem = async(id)=>{
    return api.delete(`/cart/${id}/`)
}
