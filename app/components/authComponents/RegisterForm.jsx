"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function RegisterForm({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Register:", formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Kayıt Ol</h2>
        <p className="text-gray-400">Yeni hesabınızı oluşturun</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-gray-300">
            Ad Soyad
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="name"
              type="text"
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-800/70 dark:bg-gray-700/60 border border-gray-700 dark:border-gray-600 shadow-md text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-300">
            E-posta
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-800/70 dark:bg-gray-700/60 border border-gray-700 dark:border-gray-600 shadow-md text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-gray-300">
            Şifre
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="pl-12 pr-12 py-3 w-full rounded-lg bg-gray-800/70 dark:bg-gray-700/60 border border-gray-700 dark:border-gray-600 shadow-md text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-gray-300">
            Şifre Tekrar
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="pl-12 pr-12 py-3 w-full rounded-lg bg-gray-800/70 dark:bg-gray-700/60 border border-gray-700 dark:border-gray-600 shadow-md text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 mt-1 transition-colors duration-200"
            required
          />
          <label className="text-sm text-gray-300">
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
              Kullanım Şartları
            </span>{" "}
            ve{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
              Gizlilik Politikası
            </span>
            'nı kabul ediyorum
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5"
        >
          Hesap Oluştur
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-gray-900 px-3 text-gray-400 text-sm">veya</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-700 dark:border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent rounded-lg py-2.5 shadow-md transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10 9.594-4.055 9.594-9.773 0-.656-.07-1.156-.156-1.625z"
                fill="#FFC107"
              />
              <path
                d="M3.152 7.345l3.289 2.414c.891-1.789 2.578-2.961 4.594-2.961 1.125 0 2.188.391 3.008 1.039l2.844-2.773c-1.703-1.57-3.906-2.539-6.656-2.539-3.828 0-7.07 2.484-8.406 5.961z"
                fill="#FF3D00"
              />
              <path
                d="M12 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.633-2.008 1.078-3.516 1.078-2.828 0-5.219-1.914-6.078-4.477l-3.242 2.5c1.516 3.477 4.758 5.797 8.32 5.797z"
                fill="#4CAF50"
              />
              <path
                d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-.547.07-1.078.172-1.578l-3.289-2.414c-.422.844-.664 1.789-.664 2.992 0 5.523 4.477 10 10 10 5.781 0 9.594-4.055 9.594-9.773 0-.656-.07-1.156-.156-1.625z"
                fill="#1976D2"
              />
            </g>
          </svg>
          Google ile devam et
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-400">
          Zaten hesabınız var mı?{" "}
          <button
            onClick={onToggle}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Giriş yap
          </button>
        </p>
      </div>
    </div>
  );
}
