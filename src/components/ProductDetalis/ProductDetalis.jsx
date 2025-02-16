import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { WishlistContext } from "../../Context/WishlistContext";


export default function ProductDetalis() {
  const [product, setproduct] = useState(null);
  const [Image, setImage] = useState(null);
  const [Allcategory, setAllcategory] = useState()
  let { id,category } = useParams();
    let { cartnum, setcartnum } = useContext(CartContext);
  let {AddProductToCart} = useContext(CartContext)
  async function CallAddProductToCart(id){
    let x = await AddProductToCart(id)
    if (x.data.status == 'success') {
      toast.success(x.data.message);
    }else{
      toast.error(x.data.message)
    }
    
  }
function UpdateImages(res) {
  setImage(res)
}
  function GetProductById(e) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${e}`)
      .then((res) => {
        setproduct(res.data.data);
        setcategory(data.data.data.category.name)
        // console.log(res.data);
      })
      .catch((res) => {
        // setproduct(res.data.data);
      });
  }
   function GetAllProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      setAllcategory(res.data.data)
    })
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
  const [active, setactive] = useState()
  async function CallAddProductToWishlist(id){
    let x = await addProductWishlist(id)
    if (active == id) {
      setactive(null)
    }else{
      setactive(id)
    }
      toast.success("success");
  }

  
  useEffect(() => {
    GetProductById(id);
    GetAllProduct()
  }, [id,category]);
  return (
    <>
      {product != null ? <><div className="row m-4 mb-16 bg-white border-[0.2px] rounded-md  shadow-lg">
        <div className="md:w-[50%] w-full md:border-r">
          <div className="w-full flex justify-center h-fit border-b-4">
            <img src={Image == null ? product?.imageCover:Image} className="w-[50%]" alt="" />
          </div>
          <div className="flex my-4 justify-center gap-3">
            {product?.images.map((res) => (
              <img
              onClick={() => UpdateImages(res)}
                src={res}
                className="w-[30px] border-[#f1f1f100] cursor-pointer border-2 hover:border-emerald-600"
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="md:w-[50%] w-full">
          <div className="p-3">
            <h4 className="text-3xl text-left">
              {product?.description}
            </h4>
            <div className="my-4">
              <p className="text-left text-[#606060]">
                {product?.title}
              </p>
            </div>
            <div className="flex justify-between text-3xl">
              <h4 className="m-0 fw-normal">{product?.price} EGP</h4>
              <p className=" m-0">
                {product?.ratingsAverage} <i className="fa-solid fa-star text-yellow-300" />
              </p>
            </div>
            <div className="w-full text-left">
            <button onClick={()=>CallAddProductToCart(product.id)} type="button" className=" text-emerald-700 hover:text-white border border-emerald-700 hover:bg-emerald-500   font-medium text-sm px-9 py-3 mt-3  mb-2 ">Add To Cart</button>
            </div>
            
          </div>
        </div>
      </div>
      <div className="row">
      {Allcategory?.filter((res)=>res.category.name == category).map((res)=>(
        <div
        className="md:w-1/6 w-1/2 relative cursor-pointer hover:border-2 product border-2 border-[#f1f1f100] hover:border-emerald-700 transition-all"
        key={res.id}
        >
            <div className="p-3 mb-3">
              <Link to={`/ecommerce/productdetails/${res.id}/${res.category.name}`}>
                <img src={res.imageCover} className="w-full" alt="" />
                <h3 className="text-emerald-700 text-left">
                  {res.category.name}
                </h3>
                <h3 className="mb-3 font-semibold text-left">
                  {res.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="justify-between flex p-3 ">
                  <span>{res.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>
                    {res.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button onClick={()=>CallAddProductToCart(res.id)} className="w-full p-2 rounded-md text-white btn bg-emerald-700">
                Add to Cart
              </button>
          </div>
          <i onClick={()=>CallAddProductToWishlist(res.id)}  class={active == res.id? "fa-solid  fa-heart text-3xl absolute top-3 right-3 text-red-600 ":"fa-regular  fa-heart text-3xl absolute top-3 right-3 text-red-600 "}></i>
      </div>
      ))}
    </div>
    </>:<div className="loader relative left-[50%]"></div>}
    </>
  );
}
