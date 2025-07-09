"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../features/auth/authService";

export default function RegisterForm({ onToggle }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );

      if (result) {
        router.push("/tasks");
      }
    } catch (error) {
      setError(`Kayıt işlemi başarısız oldu: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Kayıt Ol</h2>
        <p className="text-gray-400">Yeni hesabınızı oluşturun</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

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
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-800/70 border border-gray-700 shadow-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
              disabled={loading}
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
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-800/70 border border-gray-700 shadow-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
              disabled={loading}
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
              className="pl-12 pr-12 py-3 w-full rounded-lg bg-gray-800/70 border border-gray-700 shadow-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              disabled={loading}
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
              className="pl-12 pr-12 py-3 w-full rounded-lg bg-gray-800/70 border border-gray-700 shadow-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              disabled={loading}
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
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 mt-1"
            required
            disabled={loading}
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
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg transition-colors duration-200"
        >
          {loading ? "Kayıt Oluşturuluyor..." : "Hesap Oluştur"}
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
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent rounded-lg py-2.5 shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google ile devam et
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-400">
          Zaten hesabınız var mı?{" "}
          <button
            onClick={onToggle}
            disabled={loading}
            className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Giriş yap
          </button>
        </p>
      </div>
    </div>
  );
}
