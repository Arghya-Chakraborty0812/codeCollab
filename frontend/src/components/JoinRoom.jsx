import React from "react";
import laptop from "../assets/Pi7_laptop.png";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast"; // Added Toaster
import httpClient from "../config/AxiosHelper.js"; // CHECK THIS PATH!
import { useNavigate } from "react-router";

export default function JoinRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const handleAction = async (data, actionType) => {
    const loadingToast = toast.loading(`${actionType === "CREATE" ? "Creating" : "Joining"} room...`);
    
    try {
      const endpoint = actionType === "CREATE" ? "/api/v1/rooms/create" : "/api/v1/rooms/join";
      
      // The actual API call
      const response = await httpClient.post(endpoint, data);
      
      toast.success(`Welcome to ${data.roomId}!`, { id: loadingToast });
      navigate('/code', 
        { 
          state: { roomId: data.roomId, username: data.username } 
        });
      console.log("Server Response:", response.data);

      // Next step: redirect to the editor page
      // navigate(`/room/${data.roomId}`);
      
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data || "Server is offline or unreachable";
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#0f172a]">
      {/* 1. This must be here for toasts to show up! */}
      <Toaster position="top-center" />

      <div className="w-6/12 h-4/6 bg-[#1f2937] border-8 border-gray-400 rounded-xl p-10 flex flex-col gap-7 items-center text-white">
        <div className="flex items-center gap-6 mb-6">
          <img src={laptop} alt="logo" className="w-10 h-9" />
          <span className="text-3xl text-gray-400">|</span>
          <h1 className="text-xl font-mono">CODE COLLAB</h1>
        </div>

        <h2 className="text-2xl font-normal">Enter the ROOM ID</h2>

        {/* Inputs */}
        <div className="w-full flex flex-col gap-1">
            <input
                type="text"
                placeholder="ROOM ID"
                className="w-full p-3 rounded-md text-black outline-none"
                {...register("roomId", {
                required: "Room ID is required",
                pattern: {
                    value: /^room-[A-Za-z0-9]+$/,
                    message: "Must start with 'room-'"
                }
                })}
            />
            {errors.roomId && <span className="text-red-400 text-sm">{errors.roomId.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
            <input
                type="text"
                placeholder="USERNAME"
                className="w-full p-3 rounded-md text-black outline-none"
                {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Min 3 characters" }
                })}
            />
            {errors.username && <span className="text-red-400 text-sm">{errors.username.message}</span>}
        </div>

        <div className="flex gap-4">
          <button 
            type="button"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md font-semibold w-36"
            onClick={handleSubmit((data) => handleAction(data, "JOIN"))}
          >
            JOIN
          </button>

          <button 
            type="button"
            className="bg-orange-600 hover:bg-orange-800 px-6 py-2 rounded-md font-semibold w-36"
            onClick={handleSubmit((data) => handleAction(data, "CREATE"))}
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}