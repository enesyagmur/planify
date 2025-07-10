"use client";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { addNewCategoryThunk } from "../../features/category/categoryThunk";

// Mock renkler
const colors = [
  "bg-pink-700",
  "bg-green-700",
  "bg-yellow-600",
  "bg-blue-700",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-indigo-700",
  "bg-emerald-600",
  "bg-orange-600",
];

const NewCategoryModal = ({ onClose, userId }) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    color: "bg-purple-700",
  });
  const dispatch = useDispatch();

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      if (!category.name || !category.color === "bg-purple-700") {
        throw new Error(
          "NewCategoryModal | Kategori oluşturma hatası: bilgiler eksik"
        );
      }

      const data = { userId: userId, category: category };

      const result = await dispatch(addNewCategoryThunk(data)).unwrap();
      if (result) {
        onClose();
      }
    } catch (err) {
      throw new Error(err);
    }
  };

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
        onSubmit={addCategory}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-3 right-3 text-gray-400 hover:text-white  text-2xl font-bold focus:outline-none transition`}
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
            Kategori İsmi
          </label>
          <input
            id="categoryName"
            type="text"
            className={`w-full px-3 py-2 capitalize rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition`}
            placeholder="Kategori adını girin"
            value={category.name}
            onChange={(e) =>
              setCategory((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="description"
          >
            Açıklama
          </label>
          <input
            id="description"
            type="text"
            className={`w-full px-3 py-2 capitalize rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition`}
            placeholder="Açıklama giriniz"
            value={category.description}
            onChange={(e) =>
              setCategory((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-2">Renk</label>
          <div className="flex gap-3">
            {colors.map((color, idx) => (
              <span
                key={idx}
                className={`w-7 h-7 rounded-full border-2 border-gray-700 ${color} cursor-pointer`}
                title={color}
                onClick={() =>
                  setCategory((prev) => ({ ...prev, color: color }))
                }
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-lg ${category.color}  text-gray-200 hover:text-white font-semibold transition shadow-md cursor-pointer  opacity-70 hover:opacity-100`}
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default NewCategoryModal;
