import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "./../../assets/banner-4.jpeg";
import image2 from "./../../assets/slider-image-3.jpeg";
import image3 from "./../../assets/slider-image-2.jpeg";
import image4 from "./../../assets/slider-2.jpeg";
import { useQuery } from "@tanstack/react-query";

export default function CategorisSlider() {
  //

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategortis,
  });

  function GetCategortis() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settingss = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {isLoading !== true ? (
        <div className="mb-7 mt-7">
          <Slider {...settingss}>
            <img
              src={image1}
              className="w-full h-[200px] md:h-[300px] md:object-fill object-cover"
              alt=""
            />
            <img
              src={image2}
              className="w-full h-[200px] md:h-[300px] md:object-fill object-cover"
              alt=""
            />
            <img
              src={image3}
              className="w-full h-[200px] md:h-[300px] md:object-fill object-cover"
              alt=""
            />
            <img
              src={image4}
              className="w-full h-[200px] md:h-[300px] md:object-fill object-cover"
              alt=""
            />
          </Slider>
        </div>
      ) : null}
      {isLoading == true ? null : (
        <>
          <h1 className="text-left ms-2 mb-2 text-3xl font">
            Shop Popular Categories :
          </h1>
          <div className="mb-24  ">
            <Slider {...settings} className="">
              {data?.data.data.map((res) => (
                <div className="cursor-pointer  ">
                  <img
                    src={res.image}
                    className="w-full h-[200px] object-fill"
                    alt=""
                  />
                  <h4>{res.name}</h4>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </>
  );
}
