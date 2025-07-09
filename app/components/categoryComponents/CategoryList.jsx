import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { fetchCategoriesThunk } from "../../features/category/categoryThunk";
import { useDispatch, useSelector } from "react-redux";

// Mock kategori verisi

const CategoryList = ({ userId }) => {
  const categoryState = useSelector((state) => state.categoryState);
  const { categories, loading, error } = categoryState;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!userId) {
        throw new Error("CategoryList | Kullanıcı Id eksik");
      }
      await dispatch(fetchCategoriesThunk(userId));
    };

    fetchCategories();
  }, [userId, categoryState]);
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-2">
      {categoryState.categories?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir kategori yok.
        </div>
      ) : (
        <div>
          {categories?.map((cat) => (
            <CategoryItem key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
