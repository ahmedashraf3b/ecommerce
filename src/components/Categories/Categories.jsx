import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Categories() {
  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategortis,
  });

  
  let navigat = useNavigate();

  

  function GetCategortis() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  function Getspcategory(name) {
    return (
        navigat(`/categories/${name}`)
      )
  }
  
  
  

  return (
    <>
      {isLoading == false  ? (
        <>
              <div className="row w-full">
                {data?.data.data.map((res) => (
                  <div
                    onClick={() => Getspcategory(res.name)}
                    className="md:w-1/2 cursor-pointer lg:w-1/5 w-full  mb-4"
                  >
                    <div className="max-w-sm mx-2 bg-white border border-[#a8a7a75e] rounded-lg shadow-sm">
                      <img
                        className="rounded-t-lg object-fill w-full h-[270px]"
                        src={res.image}
                        alt
                      />
                      <div className="p-5">
                        <h1>{res.name}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) 
       : (
        <div className="loader relative left-[50%]"></div>
      )}
    </>
  );
}
