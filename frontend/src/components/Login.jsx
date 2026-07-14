import React from "react";
import laptop from "../assets/Pi7_laptop.png";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import httpClient from "../config/AxiosHelper.js";
import { useNavigate, Link } from "react-router";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Logging in...");
    try {
      const response = await httpClient.post("/api/v1/auth/login", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      toast.success(`Welcome back, ${response.data.username}!`, { id: loadingToast });
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data || "Login failed";
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

        <h2 className="text-2xl font-normal">Log in</h2>

        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="USERNAME"
            className="w-full p-3 rounded-md text-black outline-none"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <span className="text-red-400 text-sm">{errors.username.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full p-3 rounded-md text-black outline-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
        </div>

        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md font-semibold w-40"
          onClick={handleSubmit(onSubmit)}
        >
          LOG IN
        </button>

        <p className="text-sm text-gray-400">
          No account? <Link to="/register" className="text-orange-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}