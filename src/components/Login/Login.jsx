import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
    let {UserLogin,setUserLogin} = useContext(UserContext)

  let Navigat = useNavigate();
  const [apimessage, setapimessage] = useState()
  const [spiner, setspiner] = useState(false)

  async function handelLogin(params) {
    setspiner(true)
    // setemail(params);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", params)
      .then((res)=>{
        setspiner(false)
        localStorage.setItem('email',res.data.user.email)
        console.log(res.data.user.email)
        
      if (res.data.message == 'success') {
        localStorage.setItem("UserToken",res.data.token)
        setUserLogin(res.data.token)
        Navigat('/ecommerce')
      }
      
      }
        )
      .catch((res)=> {
        setspiner(false)
        setapimessage(res.response.data.message)
      }
      );
    console.log(data);
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("Not valid").required("Email is Not required"),
    password: yup
      .string()
      .required("Password is Not required")
      .min(6, "min length 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
    {apimessage ?     <div className="w-1/2 mx-auto my-6 bg-red-600 text-white font-bold rounded-lg p-3 ">
    {apimessage}
    </div>: null}
    <h2 className="font-bold text-2xl text-center md:mt-12 text-emerald-700">
      Login Now
    </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md md:mt-12 mx-auto">
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_email"
            className="block text-left py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_password"
            className="block text-left py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 pb-0 mb-2   text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 flex-col items-start">
        <Link to={'/ecommerce/forgetpassword'}><span className="text-blue-500 underline">Forget password</span></Link>
        <Link to={"/ecommerce/register"}><span className="text-blue-500 underline">Don't you have account ? Register Now</span></Link>
        <button
          type="submit"
          className="text-white my-5  bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          {spiner == true ? <i className="fas fa-spinner fa-spin"></i>:"Login"}
        </button>
        </div>
      </form>
    </>
  );
}
