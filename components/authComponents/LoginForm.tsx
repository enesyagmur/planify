"use client";

import {
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowRight,
} from "react-icons/ai";
import LoginWithGoogle from "./LoginWithGoogle";

const LoginForm = () => {
  return (
    <form className="space-y-2">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-themeColor transform transition-all duration-300 hover:rotate-12">
          <AiOutlineLock className="w-8 h-8 text-mainTextColor" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-mainTextColor">
          Hoş Geldiniz
        </h2>
        <p className="text-secondTextColor">Hesabınıza giriş yapın</p>
      </div>

      {/* Email Field */}
      <div className="relative">
        <label className="block text-sm font-medium mb-2 text-mainTextColor">
          E-posta
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <AiOutlineMail className="w-5 h-5 transition-colors duration-200 text-secondTextColor" />
          </div>
          <input
            type="email"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-thirdBackground bg-thirdBackground transition-all duration-200 focus:outline-none focus:ring-2 focus:border-themeColor text-mainTextColor"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="relative">
        <label className="block text-sm font-medium mb-2 text-mainTextColor">
          Şifre
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <AiOutlineLock className="w-5 h-5 transition-colors duration-200 text-secondTextColor" />
          </div>
          <input
            type="password"
            className="w-full pl-12 pr-12 py-4 rounded-xl border border-thirdBackground bg-thirdBackground transition-all duration-200 focus:outline-none focus:ring-2 focus:border-themeColor text-mainTextColor"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
          >
            <AiOutlineEye className="w-5 h-5 text-secondTextColor" />
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-2 border-thirdBackground bg-thirdBackground focus:ring-2 focus:ring-themeColor focus:ring-offset-0 transition-colors duration-200"
          />
          <span className="text-sm text-secondTextColor">Beni hatırla</span>
        </label>
        <a
          href="#"
          className="text-sm hover:underline transition-colors duration-200 text-themeColor"
        >
          Şifremi unuttum
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-themeColor/50 bg-themeColor text-mainTextColor shadow-lg shadow-themeColor/30"
      >
        <span>Giriş Yap</span>
        <AiOutlineArrowRight className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-thirdBackground"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-secondBackground text-secondTextColor">
            veya
          </span>
        </div>
      </div>

      {/* Google ile Giriş Butonu */}
      <LoginWithGoogle />

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-secondTextColor">
          Hesabınız yok mu?{" "}
          <a
            href="#"
            className="font-semibold hover:underline transition-colors duration-200 text-themeColor"
          >
            Kayıt olun
          </a>
        </p>
      </div>
    </form>
  );
};
export default LoginForm;
