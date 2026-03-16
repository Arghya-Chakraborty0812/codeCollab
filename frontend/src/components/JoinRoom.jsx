import React from "react";
import laptop from "../assets/Pi7_laptop.png";
import { useForm } from "react-hook-form";

export default function JoinRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#0f172a]">
      
      {/* Card */}
      <div className="w-6/12 h-4/6 bg-[#1f2937] border-8 border-gray-400 rounded-xl p-10 flex flex-col gap-7 items-center text-white">

        {/* Logo / Title */}
        <div className="flex items-center gap-6 mb-6">
          <img src={laptop} alt="logo" className="w-10 text-white h-9" />
          <span className="text-3xl text-gray-400">|</span>
          <h1 className="text-xl font-mono">CODE COLLAB</h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-normal mb-6 mt-6">
          Enter the ROOM ID
        </h2>

        {/* Inputs */}
        <input
        type="text"
        placeholder="ROOM ID"
        className="w-full p-3 mb-2 rounded-md text-black outline-none"
        {...register("roomId", {
          required: "Room ID is required",
          pattern: {
            value: /^room-[A-Za-z0-9]+$/,
            message: "Room ID must start with 'room-' (example: room-123)"
          }
        })}
        />

        <input
          type="text"
          placeholder="USERNAME"
          className="w-full p-3 mb-6 rounded-md text-black outline-none"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters"
            }
          })}
        />

       {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md font-semibold w-36">
            JOIN
          </button>

          <button className="bg-orange-600 hover:bg-orange-800 px-6 py-2 rounded-md font-semibold w-36">
            CREATE
          </button>
        </div>


      </div>
    </div>
  );
}