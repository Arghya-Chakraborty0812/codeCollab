import React from "react";
import laptop from "../assets/Pi7_laptop.png";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import httpClient from "../config/AxiosHelper.js";
import { useNavigate, Link } from "react-router";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Creating account...");
    try {
      const response = await httpClient.post("/api/v1/auth/register", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      toast.success("Account created!", { id: loadingToast });
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data || "Registration failed";
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#0f172a]">
      <Toaster />
      <div className="w-6/12 h-4/6 bg-[#1f2937] border-8 border-gray-400 rounded-xl p-10 flex flex-col gap-7 items-center text-white">
        <div className="flex items-center gap-6 mb-6">
          <img src={laptop} alt="logo" className="w-10 h-9" />
          <span className="text-3xl text-gray-400">|</span>
          <h1 className="text-xl font-mono">CODE COLLAB</h1>
        </div>

        <h2 className="text-2xl font-normal">Create account</h2>

        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="USERNAME"
            className="w-full p-3 rounded-md text-black outline-none"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
          />
          {errors.username && <span className="text-red-400 text-sm">{errors.username.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full p-3 rounded-md text-black outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            className="w-full p-3 rounded-md text-black outline-none"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords don't match",
            })}
          />
          {errors.confirmPassword && <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>}
        </div>

        <button
          type="button"
          className="bg-orange-600 hover:bg-orange-800 px-6 py-2 rounded-md font-semibold w-40"
          onClick={handleSubmit(onSubmit)}
        >
          REGISTER
        </button>

        <p className="text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-green-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}