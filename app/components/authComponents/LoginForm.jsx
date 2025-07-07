"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import { loginUser } from "../../features/auth/authService";

export default function LoginForm({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginUser(email, password);
      if (typeof result === "string") {
        // Hata durumu
        setError(result);
      } else {
        router.push("/tasks");
      }
    } catch (error) {
      setError(`Giriş yapılırken bir hata oluştu: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Giriş Yap</h2>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-800/70 dark:bg-gray-700/60 border border-gray-700 dark:border-gray-600 shadow-md text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 py-3 w-full rounded-lg bg-gray-800/70 dark:bg-gray-700/60 border border-gray-700 dark:border-gray-600 shadow-md text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-colors duration-200 outline-none"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
              disabled={loading}
            />
            <span className="text-gray-300">Beni hatırla</span>
          </label>
          <button
            type="button"
            className="text-sm text-purple-400 hover:text-purple-300"
            disabled={loading}
          >
            Şifremi unuttum
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg transition-colors duration-200"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
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
          className="w-full flex items-center justify-center gap-2 border border-gray-700 dark:border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent rounded-lg py-2.5 shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-5 h-5" />
          Google ile devam et
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-400">
          Hesabınız yok mu?{" "}
          <button
            onClick={onToggle}
            disabled={loading}
            className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50"
          >
            Kayıt ol
          </button>
        </p>
      </div>
    </div>
  );
}
