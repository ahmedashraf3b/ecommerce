import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Wishlist() {
  const [wishlist, setwishlist] = useState(null);
  const [count, setcount] = useState(null);
  const [loading, setloading] = useState(false);
  let {GetlogeWishlist,Deleat} = useContext(WishlistContext)

  async function getWishlist() {
    let x = await GetlogeWishlist();
    console.log(x.data);
    setcount(x.data)
    setwishlist(x.data.data);
    
  }
  function Deleat1(e) {
    let {data} = Deleat(e)
      toast.success(data.status);

  }


  useEffect(() => {
    getWishlist();
  }, [wishlist]);
  return (
    <>
      {wishlist !== null ?
      <>
      <div className="border-b-2  p-3 mb-5">
      <h1 className="text-left text-3xl">My Wishlist</h1>
    </div>
        <div>
          {count?.count == 0 ? 
          <h1 className="text-3xl">Your Wishlist is empty 😔</h1>
          :
          <>
          {wishlist == null ? (
            <div className="loader relative left-[50%]"></div>
          ) : (
            wishlist?.map((res) => (
              <div className="border-b-2 md:flex md:justify-between">
                <div className="md:flex md:justify-center justify-between  gap-4 p-3   md:w-[50%]">
                  <div className="md:w-[40%] w-full">
                    <Link to={`/productdetails/${res.id}/${res.category.name}`}>
                    <img
                      src={res.imageCover}
                      className="md:w-full text-left w-[50%]"
                      alt=""
                      />
                      </Link>
                  </div>
                  <div className="flex justify-center flex-col">
                    <h1 className="mt-3">{res.title}</h1>
                    <p className="text-emerald-600 text-left my-3">
                      {res.price} EGP
                    </p>
                    <p
                      onClick={() => Deleat1(res.id)}
                      className="text-emerald-600 hover:text-red-600 text-left my-2 cursor-pointer"
                    >
                      <i class="fa-regular fa-trash-can me-2"></i>Remove
                    </p>
                  </div>
                </div>
               
              </div>
            ))
          )}
          </>}
          
         
        </div>
    </>
    :<div className="loader relative left-[50%]"></div>}
    </>
  );
}
