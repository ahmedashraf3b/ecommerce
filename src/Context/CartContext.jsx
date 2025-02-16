import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartnum, setcartnum] = useState(0)
  const [CartId, setCartId] = useState()
  let headers = {
    token: localStorage.getItem(`UserToken`),
  };
  function AddProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function GetLoggedusercart() {
    let x =  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    }).then((res)=>{
      setcartnum(res.data.numOfCartItems)
      setCartId(res.data.data._id)
      return res
    })
    return x
  }
  function UpdateProductCount(id, counts) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:counts},{headers})
    .then((res)=>res)
    .catch((err)=>err)
  }
  function DeleatCartProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)
  }
  function Checkout(cartid,url,formdata) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=${url}`,{
      shippingAddress : formdata
    },{
      headers,
    })
    .then((res)=>res)
    .catch((err)=>err)
  }


useEffect(() => {
  GetLoggedusercart()
}, [cartnum , setcartnum])

  return (
    <CartContext.Provider
      value={{ AddProductToCart, GetLoggedusercart, UpdateProductCount,DeleatCartProduct,cartnum,setcartnum,Checkout,CartId }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
