import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {

  let {data,isError,error,isLoading} = useQuery({
    queryKey:["brands"],
    queryFn:GetBrands
  })
  function GetBrands() {
   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    
  }
  // console.log(data.data.data);
  


  return (
    <>
      <div className="row">
          {data?.data?.data.map((res)=>(
            <div className="md:w-1/2 lg:w-1/5 w-full   mb-4">
            <div className="max-w-sm mx-2 bg-white border border-[#a8a7a75e] rounded-lg shadow-sm">
              <a href="#">
                <img
                  className="rounded-t-lg object-fill w-full h-[200px]"
                  src={res.image}
                  alt
                />
              </a>
              <div className="p-5">
               <h1>{res.name}</h1>
              </div>
            </div>
          </div>
          ))}
      </div>
    </>
  );
}
