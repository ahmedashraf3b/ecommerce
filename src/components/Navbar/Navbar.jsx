import React, { useContext, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let { cartnum, setcartnum } = useContext(CartContext);
  const [button, setbutton] = useState(false);
  let Navigate = useNavigate();

  function SignOut() {
    localStorage.removeItem("UserToken");
    setUserLogin(null);
    Navigate("login");
  }

  function resbonsive(e) {
    if (e == false) {
      setbutton(false);
    } else if (button == true) {
      setbutton(false);
    } else {
      setbutton(true);
    }
  }

  return (
    <>
      <nav className="bg-white  fixed z-50 top-0 left-0 right-0 shadow border-gray-200 ">
        <div className="hidden md:flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <div className="flex justify-center">
            <Link
              to=""
              className="flex items-center space-x-3 me-2 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8" alt="FreshCart" />
            </Link>
            {/* <div className=""> */}
            {UserLogin != null ? (
              <div className=" inline-block">
                <Link className="text-slate-600 p-4" to="">
                  Home
                </Link>
                <Link className="text-slate-600 p-4" to="products">
                  Products
                </Link>
                <Link className="text-slate-600 p-4" to="categories">
                  Categories
                </Link>
                <Link className="text-slate-600 p-4" to="brands">
                  Brands
                </Link>
              </div>
            ) : null}
          </div>
          <div className=" flex items-center space-x-6 p-2 rtl:space-x-reverse">
            {UserLogin != null ? (
              <>
                <Link className="text-black relative border-r-2 p-4" to="cart">
                  Cart
                  <i class="fa-solid ms-1  fa-cart-shopping"></i>
                  {cartnum == 0 ? null : (
                    <div className="absolute top-0 right-1 text-white rounded-full size-5 flex items-center justify-center bg-emerald-600 ">
                      {cartnum}
                    </div>
                  )}
                </Link>
                <Link
                  to={"wishlist"}
                  className="text-black relative border-r-2 p-4"
                >
                  Wishlist
                  <i class="fa-solid fa-heart ms-1"></i>
                </Link>
              </>
            ) : null}
            {UserLogin != null ? (
              <div className=" inline-block">
                <span
                  onClick={() => SignOut()}
                  className="cursor-pointer text-sm"
                >
                  SignOut
                </span>
              </div>
            ) : (
              <>
                <Link to="login" className="text-sm">
                  Login
                </Link>

                <Link to="register" className="text-sm">
                  Register
                </Link>
              </>
            )}
            {/* </div> */}
          </div>
        </div>
        <div className="flex md:hidden flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <div className=" flex justify-center">
            <Link
              onClick={() => resbonsive(false)}
              to=""
              className="flex items-center space-x-3 me-2 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8" alt="FreshCart" />
            </Link>
          </div>
          <div className=" flex items-center space-x-6 p-2 rtl:space-x-reverse">
            <button onClick={resbonsive}>
              <i className="p-3 text-3xl fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
        {button == false ? null : (
          <div className="transition">
            {UserLogin != null ? (
              <div className=" flex flex-col">
                <Link onClick={resbonsive} className="text-slate-600 p-4" to="">
                  Home
                </Link>
                <Link
                  onClick={resbonsive}
                  className="text-slate-600 p-4"
                  to="products"
                >
                  Products
                </Link>
                <Link
                  onClick={resbonsive}
                  className="text-slate-600 p-4"
                  to="categories"
                >
                  Categories
                </Link>
                <Link
                  onClick={resbonsive}
                  className="text-slate-600 p-4"
                  to="brands"
                >
                  Brands
                </Link>
              </div>
            ) : null}

            <div className="flex flex-col mb-4">
              {UserLogin != null ? (
                <>
                  <Link
                    onClick={resbonsive}
                    className="text-black relative border-r-2 p-6"
                    to="cart"
                  >
                    Cart
                    <i class="fa-solid ms-2 fa-cart-shopping"></i>
                    {cartnum == 0 ? null : (
                      <div className="absolute size-5 flex items-center justify-center top-2 left-[53%]    p-1 rounded-full text-white bg-emerald-600">
                        {cartnum}
                      </div>
                    )}
                  </Link>
                  <Link
                    to={"wishlist"}
                    className="text-black relative border-r-2 p-4"
                  >
                    Wishlist
                    <i class="fa-solid fa-heart ms-1"></i>
                  </Link>
                  <div className=" inline-block">
                    <span
                      onClick={() => SignOut()}
                      className="cursor-pointer text-sm"
                    >
                      SignOut
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Link onClick={resbonsive} to="login" className="text-sm m-5">
                    Login
                  </Link>

                  <Link
                    onClick={resbonsive}
                    to="register"
                    className="text-sm m-5"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
