import React from "react";
import CategoryItem from "./CategoryItem";

// Mock kategori verisi
const categories = [
  { id: 1, name: "İş", color: "bg-purple-600" },
  { id: 2, name: "Kişisel", color: "bg-pink-500" },
  { id: 3, name: "Sağlık", color: "bg-green-500" },
  { id: 4, name: "Alışveriş", color: "bg-yellow-500" },
];

const CategoryList = ({ userId }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-2">
      {categories.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir kategori yok.
        </div>
      ) : (
        <div>
          {categories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
