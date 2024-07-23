import React, { useState } from "react";
import icon from "../../../assets/Images/icon.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLoading from "../../../lib/Zustand/LoadingStore";
import Loading from "../../../components/Loading";

const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { isLoading, setLoading } = useLoading();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      toast.info("Konfirmasi Password Salah");
      return;
    }
    if (!agreeTerms) {
      toast.info("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    setLoading(true);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Agree Terms:", agreeTerms);

    toast.success("Register Berhasil", {
      onAutoClose: () => {
        setLoading(false);
        navigate("/beranda");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:max-w-lg max-w-[26rem]">
        <div className="flex justify-center mb-6">
          <img src={icon} alt="icon" className="w-24 h-24 rounded-full" />
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-500 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Masukan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-3 border border-hijau-tua dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-hijau-tua focus:border-hijau-tua sm:text-sm dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500 dark:text-gray-300"
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
              className="block text-sm font-medium text-gray-500 dark:text-gray-300"
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
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-500 dark:text-gray-300"
            >
              Konfirmasi Kata sandi
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Konfirmasi kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-3 border border-hijau-tua dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-hijau-tua focus:border-hijau-tua sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
       
              />
              <span></span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                Saya menyetujui{" "}
                <a href="#" className="text-hijau-tua hover:text-hijau-tua">
                  syarat & ketentuan
                </a>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex disabled:bg-white disabled:border-hijau-tua disabled:py-3 font-bold justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-hijau-tua hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hijau-tua"
            >
              {isLoading  ? <Loading /> : "Daftar"}
        
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sudah punya akun?{" "}
              
              <Link
                to={"/"}
                className="font-medium text-hijau-tua hover:text-hijau-tua"
              >
                Masuk
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
