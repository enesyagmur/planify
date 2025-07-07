import React from "react";

// Mock renkler
const colors = [
  "bg-purple-600",
  "bg-pink-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-blue-500",
];

const NewCategoryModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arka plan */}
      <div
        className="absolute inset-0 bg-black/80 dark:bg-black/90 transition-opacity"
        onClick={onClose}
        aria-label="Modalı Kapat"
      />
      {/* Modal kutusu */}
      <form
        className="relative z-10 bg-gray-900 dark:bg-black rounded-2xl shadow-xl p-6 w-full max-w-md mx-2 transition border border-gray-800"
        autoComplete="off"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 text-2xl font-bold focus:outline-none transition"
          aria-label="Kapat"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
          Yeni Kategori Oluştur
        </h2>
        <div className="mb-5">
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="categoryName"
          >
            Kategori İsmi <span className="text-purple-500">*</span>
          </label>
          <input
            id="categoryName"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
            placeholder="Kategori adını girin"
            value=""
            readOnly
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-2">Renk</label>
          <div className="flex gap-3">
            {colors.map((color, idx) => (
              <span
                key={idx}
                className={`w-7 h-7 rounded-full border-2 border-gray-700 ${color} cursor-not-allowed`}
                title={color}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-md cursor-not-allowed opacity-70"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default NewCategoryModal;
