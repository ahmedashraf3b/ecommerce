import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistCotextProvider(props){
    let headers = {
        token: localStorage.getItem(`UserToken`),
      };
      function GetlogeWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers,
        })
      }
      function addProductWishlist(productId) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId :productId
        },{
            headers,
        })
      }

      function Deleat(e) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${e}`,{
          headers,
        })
      }

    return <WishlistContext.Provider value={{GetlogeWishlist,addProductWishlist,Deleat}}>
        {props.children}
    </WishlistContext.Provider>
}