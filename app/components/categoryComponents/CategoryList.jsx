import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { getCategoriesService } from "../../features/category/categoryService";

// Mock kategori verisi

const CategoryList = ({ userId }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!userId) {
        throw new Error("CategoryList | Kullanıcı Id eksik");
      }
      const result = await getCategoriesService(userId);
      if (result) {
        setCategories(result);
      }
    };

    fetchCategories();
  }, [userId]);
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
