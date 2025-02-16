import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Code() {
    let {UserLogin,setUserLogin} = useContext(UserContext)

  let Navigat = useNavigate();
  const [apimessage, setapimessage] = useState()
  const [spiner, setspiner] = useState(false)

  async function handelLogin(params) {
    setspiner(true)
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", params)
      .then((res)=>{
        console.log(res);
        
        setspiner(false)
          // localStorage.setItem("UserToken",res.data.token)
        setUserLogin(res.data.token)
        Navigat('/newPassword')

      // if (res.data.message == 'success') {
      //   localStorage.setItem("UserToken",res.data.token)
      //   setUserLogin(res.data.token)
      // }
      
      }
        )
      .catch((res)=> {
        setspiner(false)
        console.log(res);
        
        setapimessage(res.response.data.message)
      }
      );
  }


  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handelLogin,
  });

  return (
    <>
    {apimessage ?     <div className="w-1/2 mx-auto my-6 bg-red-600 text-white font-bold rounded-lg p-3 ">
    {apimessage}
    </div>: null}
    
      <form onSubmit={formik.handleSubmit} className="max-w-md md:mt-12 mx-auto">
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_resetCode"
            className="block text-left py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_resetCode"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Code
          </label>
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.resetCode}</span>
            </div>
          ) : null}
        </div>
        
        <div className="flex gap-4 items-center">
        <button
          type="submit"
          className="text-white  bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          {spiner == true ? <i className="fas fa-spinner fa-spin"></i>:"Code"}
        </button>
      
        </div>
      </form>
    </>
  );
}