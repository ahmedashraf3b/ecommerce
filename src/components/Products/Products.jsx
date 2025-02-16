import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast'
import { useQuery } from "@tanstack/react-query";
import { WishlistContext } from "../../Context/WishlistContext";


export default function Products() {
    // 
  let { cartnum, setcartnum } = useContext(CartContext);

    let {data,isError,error,isLoading} = useQuery({
      queryKey: ['recentproduct'],
      queryFn:GetAllProduct
    })
  
    let {AddProductToCart} = useContext(CartContext)
    function GetAllProduct() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    async function CallAddProductToCart(id){
      let {data} = await AddProductToCart(id)
      if (data.status == 'success') {
        setcartnum(cartnum + 1)
        toast.success(data.message);
      }else{
        toast.error(data.message)
      }
    }
    let { addProductWishlist} = useContext(WishlistContext);
  async function CallAddProductToWishlist(id){
    let x = await addProductWishlist(id)
      toast.success("success");
  }
  return (
    <>
      <h1 className="text-left ms-2 mb-0 text-3xl font">
        Frequently Bought Products :
      </h1>
      <div className="row ">
        {isLoading != true ? (
          data?.data.data.map((product) => (
            <div
              className="md:w-1/6 w-1/2 cursor-pointer relative hover:border-2 product border-2 border-[#f1f1f100] hover:border-emerald-700 transition-all"
              key={product.id}
            >
              <div className="p-3 mb-3">
                <Link to={`/ecommerce/productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="text-emerald-700 text-left">
                    {product.category.name}
                  </h3>
                  <h3 className="mb-3 font-semibold text-left">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="justify-between flex p-3 ">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button onClick={()=>CallAddProductToCart(product.id)} className="w-full p-2 rounded-md text-white btn bg-emerald-700">
                  Add to Cart
                </button>
              </div>
              <i onClick={()=>CallAddProductToWishlist(product.id)}  class="fa-regular  fa-heart text-3xl absolute top-3 right-3 text-red-600 "></i>
            </div>
          ))
        ) : (
          <span className="loader relative left-[50%]"></span>
        )}
      </div>
    </>
  );
}
