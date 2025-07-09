"use client";
import React, { useState } from "react";
import CategoryList from "../../components/categoryComponents/CategoryList";
import NewCategoryModal from "../../components/categoryComponents/NewCategoryModal";
import { auth } from "../../lib/firebase";
import { useSelector } from "react-redux";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useSelector((state) => state.authState);

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-8">
      {/* Başlık ve Yeni Kategori Butonu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Kategoriler
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <span className="text-lg">＋</span>
          <span>Yeni Kategori</span>
        </button>
      </div>

      {/* Kategori Listesi */}
      {user?.uid && <CategoryList userId={user?.uid} />}

      {/* Yeni Kategori Modalı */}
      {showModal && (
        <NewCategoryModal
          onClose={() => setShowModal(false)}
          userId={user?.uid}
        />
      )}

      {/* Modal arka planına tıklayınca kapatma */}
      {showModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowModal(false)}
          aria-label="Modalı Kapat"
        />
      )}
    </div>
  );
};

export default Category;
