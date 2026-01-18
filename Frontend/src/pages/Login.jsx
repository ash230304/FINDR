import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext";

const schema = yup.object().shape({
  phone: yup.string().required("Phone is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password too short"),
});

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);

      setAuth(true);
      setUser(res.data.user);

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-[85vh] bg-[#0a0a0a] text-white px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 tracking-wide">
          Login
        </h2>

        <div className="mb-5">
          <label className="block mb-1 text-gray-300 font-medium">Phone</label>
          <input
            {...register("phone")}
            className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-600"
          />
          <p className="text-red-400 text-sm mt-1">
            {errors.phone?.message}
          </p>
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-gray-300 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-600"
          />
          <p className="text-red-400 text-sm mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-lg font-semibold tracking-wide"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>

      <ToastContainer />
    </motion.div>
  );
}
