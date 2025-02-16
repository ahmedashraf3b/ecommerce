import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let { GetLoggedusercart, UpdateProductCount, DeleatCartProduct } =
    useContext(CartContext);
  const [Cart, setCart] = useState(null);
  const [loading, setloading] = useState(false);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  let { cartnum, setcartnum } = useContext(CartContext);

  async function GetCart() {
    let x = await GetLoggedusercart();
    setnumOfCartItems(x.data.numOfCartItems)
    setCart(x.data);
    // console.log(x.data.data._id);
    
  }

  async function UpdateCount(id, count, loader) {
    setloading(loader);
    let { data } = await UpdateProductCount(id, count);

    if (data.status == "success") {
      setCart(data);
      toast.success(data.status);
    } else {
      toast.error("error");
    }
    setloading(false);
  }

  async function Deleat(id) {
    let { data } = await DeleatCartProduct(id);
    if (data.status == "success") {
      setCart(data);
      setcartnum(cartnum - 1)
      toast.success(data.status);
    } else {
      toast.error("error");
    }
    setnumOfCartItems(data.numOfCartItems)
  }
  useEffect(() => {
    GetCart();
  }, []);
  return (
    <>
      {Cart !== null ?
      <>
      <div className="border-b-2  p-3 mb-5">
      <h1 className="text-left text-3xl">My Cart</h1>
      <h3 className="text-left text-2xl">
        Total Cart Price :{" "}
        <span className="text-emerald-600">
          {Cart == null ? 0 : Cart.data.totalCartPrice} EGP
        </span>
      </h3>
    </div>
    {
      (numOfCartItems == 0  ? (
        <h1 className="text-3xl">Your cart is empty 😔</h1>
      ) : (
        <div>
          {Cart == null ? (
            <div className="loader relative left-[50%]"></div>
          ) : (
            Cart.data.products.map((res) => (
              <div className="border-b-2 md:flex md:justify-between">
                <div className="md:flex md:justify-center justify-between  gap-4 p-3   md:w-[50%]">
                  <div className="md:w-[40%] w-full">
                    <Link to={`/productdetails/${res.product.id}/${res.product.category.name}`}>
                    <img
                      src={res.product.imageCover}
                      className="md:w-full text-left w-[50%]"
                      alt=""
                      />
                      </Link>
                  </div>
                  <div className="flex justify-center flex-col">
                    <h1 className="mt-3">{res.product.title}</h1>
                    <p className="text-emerald-600 text-left my-3">
                      {res.price} EGP
                    </p>
                    <p
                      onClick={() => Deleat(res.product.id)}
                      className="text-emerald-600 hover:text-red-600 text-left my-2 cursor-pointer"
                    >
                      <i class="fa-regular fa-trash-can me-2"></i>Remove
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() =>
                      UpdateCount(
                        res.product.id,
                        res.count - 1,
                        `${res.product.id} minus`
                      )
                    }
                    type="button"
                    className="text-emerald-600 hover:text-white border border-emerald-600 hover:bg-emerald-600  focus:outline-none font-medium rounded-lg text-sm px-3 py-[5px] text-center me-2 mb-2 "
                  >
                    {loading !== `${res.product.id} minus` ? (
                      <i className="fa-solid fa-minus"></i>
                    ) : (
                      <i className="fas fa-spinner fa-spin"></i>
                    )}
                  </button>
                  <p className="mx-4">{res.count}</p>
                  <button
                    onClick={() =>
                      UpdateCount(
                        res.product.id,
                        res.count + 1,
                        `${res.product.id} plus`
                      )
                    }
                    type="button"
                    className="text-emerald-600 hover:text-white border border-emerald-600 hover:bg-emerald-600  focus:outline-none font-medium rounded-lg text-sm px-3 py-[5px] text-center me-2 mb-2 "
                  >
                    {loading !== `${res.product.id} plus` ? (
                      <i className="fa-solid fa-plus"></i>
                    ) : (
                      <i className="fas fa-spinner fa-spin"></i>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
          <Link to={'/cheaktOut'}>
          <button
            type="button "
            className="bg-emerald-600 text-white px-3 py-3 rounded-md m-5"
          >
            Cheakout<i class="fa-regular fa-credit-card ms-2"></i>
          </button>
          </Link>
        </div>
      ))
    }</>
    :<div className="loader relative left-[50%]"></div>}
    </>
  );
}
