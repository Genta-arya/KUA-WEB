import React, { useState } from "react";
import icon from "../../../assets/Images/icon.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLoading from "../../../lib/Zustand/LoadingStore";
import Loading from "../../../components/Loading";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoading, setLoading } = useLoading();
 const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
    toast.success("Login Berhasil", {
      closeButton: true,
      position: "top-right",
      onAutoClose: () => {
        setLoading(false);
        navigate("/beranda")
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:max-w-lg max-w-xs">
        <div className="flex justify-center mb-6">
          <img src={icon} alt="icon" className="w-24 h-24 rounded-full" />
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-3 border border-hijau-tua dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-hijau-tua focus:border-hijau-tua sm:text-sm dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Masukan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-3 border border-hijau-tua dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-hijau-tua focus:border-hijau-tua sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id="remember-me"
                required
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span></span>
              <span className="ml-2 checked:text-hijau-tua text-sm text-gray-700 dark:text-gray-300">
                Ingat Saya
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-hijau-tua hover:text-hijau-tua dark:text-gray-300"
            >
              Lupa Password?
            </a>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full disabled:bg-white disabled:border-hijau-tua disabled:py-3  flex font-bold justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-hijau-tua hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hijau-tua"
            >
              {isLoading ? <Loading /> : "Masuk"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tidak punya akun?{" "}
            </p>

            <div className="border-hijau-tua hover:bg-slate-100 transition-colors rounded-lg border w-full py-2 px-4 mt-4 text-hijau-tua font-bold cursor-pointer">
              <Link to="/register">Daftar</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
