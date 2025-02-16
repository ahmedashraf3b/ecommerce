import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function CategoriesProduct() {
  const [dataP, setdataP] = useState(null);
  let { category } = useParams();
  let { cartnum, setcartnum } = useContext(CartContext);

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentproduct"],
    queryFn: GetAllProduct,
  });

  let { AddProductToCart } = useContext(CartContext);

  function GetAllProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  async function CallAddProductToCart(id) {
    let { data } = await AddProductToCart(id);
    if (data.status == "success") {
      setcartnum(cartnum + 1);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }
  let { addProductWishlist} = useContext(WishlistContext);
  async function CallAddProductToWishlist(id){
    let x = await addProductWishlist(id)
      toast.success("success");
  }
  return (
    <>
      {isLoading == false ? (
        <>
          <h1 className="text-left ms-3 mt-3 text-3xl">All {category} :</h1>
          <div className="row">
            <>
              {data?.data?.data
                .filter((res) => res.category.name == category)
                .map((res) => (
                  <>
                    <div
                      className="md:w-1/6 w-1/2 cursor-pointer relative hover:border-2 product border-2 border-[#f1f1f100] hover:border-emerald-700 transition-all"
                      key={res.id}
                    >
                      <div className="p-3 mb-3">
                        <Link
                          to={`/productdetails/${res.id}/${res.category?.name}`}
                        >
                          <img src={res.imageCover} className="w-full" alt="" />
                          <h3 className="text-emerald-700 text-left">
                            {res.category?.name}
                          </h3>
                          <h3 className="mb-3 font-semibold text-left">
                            {res.title?.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="justify-between flex p-3 ">
                            <span>{res.price} EGP</span>
                            <span>
                              <i className="fas fa-star text-yellow-400"></i>
                              {res.ratingsAverage}
                            </span>
                          </div>
                        </Link>
                        <button
                          onClick={() => CallAddProductToCart(res.id)}
                          className="w-full p-2 rounded-md text-white btn bg-emerald-700"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <i onClick={()=>CallAddProductToWishlist(res.id)}  class="fa-regular  fa-heart text-3xl absolute top-3 right-3 text-red-600 "></i>
                    </div>
                  </>
                ))}
            </>
          </div>
        </>
      ) : (
        <p className="loader relative left-[50%]"></p>
      )}
    </>
  );
}
