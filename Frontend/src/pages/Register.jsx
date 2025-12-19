import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";

import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  password: yup.string().required("Password is required").min(6, "Password too short"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name: data.name,
        phone: data.phone,
        password: data.password,
        role: "owner",
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-[80vh] p-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register("name")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            {...register("phone")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </motion.div>
  );
}
