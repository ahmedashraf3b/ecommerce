import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Allorders() {
  let { UserLogin, email } = useContext(UserContext);
  let { CartId } = useContext(CartContext);
  const [order, setorder] = useState(null);
  async function getALlOrders() {
    let x = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
    //  console.log(x.data.data);

    let y = x.data.data.filter(
      (res) => res.user.email == localStorage.getItem("email")
    );
    setorder(y[0]);
    console.log(y);
  }
  useEffect(() => {
    getALlOrders();
  }, []);

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <div className="md:flex inline-block justify-around p-7">
          <div className="flex m-3 flex-col items-start">
            <h1 className="font-bold">
              Order ID: <span className="text-emerald-600">{order?.id}</span>
            </h1>
            <h1 className="font-bold">
              Total Payment Price:{" "}
              <span className="text-emerald-600">{order?.totalOrderPrice}</span>
            </h1>
            <h1 className="font-bold">
              Payment Method:{" "}
              <span className="text-emerald-600">
                {order?.paymentMethodType}
              </span>
            </h1>
            <p className="text-[#c4c4c4] font-bold">{order?.paidAt}</p>
          </div>
          <div className="m-3">
            <h1 className="font-bold text-2xl">Address Info</h1>
            <div className="flex items-start flex-col">
              <h1 className="text-[#b8b7b7]">
                Address Details:{" "}
                <span className="text-black">
                  {order?.shippingAddress.details}
                </span>
              </h1>
              <h1 className="text-[#b8b7b7]">
                City:{" "}
                <span className="text-black">
                  {order?.shippingAddress.city}
                </span>
              </h1>
              <h1 className="text-[#b8b7b7]">
                Phone:{" "}
                <span className="text-black">
                  {order?.shippingAddress.phone}
                </span>
              </h1>
            </div>
          </div>
          <div className="m-3">
            <h1 className="font-bold text-2xl">Customer Info</h1>
            <div className="flex items-start flex-col">
              <h1 className="text-[#b8b7b7]">
                Name: <span className="text-black">{order?.user.name}</span>
              </h1>
              <h1 className="text-[#b8b7b7]">
                Email: <span className="text-black">{order?.user.email}</span>
              </h1>
              <h1 className="text-[#b8b7b7]">
                Phone: <span className="text-black">{order?.user.phone}</span>
              </h1>
            </div>
          </div>
        </div>
        <div>{order?.cartItems.map((res)=>{
          <img src={res.product.imageCover} alt="" />
        })}</div>
      </div>
    </>
  );
}
