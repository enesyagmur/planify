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
  }, [userId, dispatch]); // categoryState dependency'sini kaldırdık

  return (
    <div className="w-full h-full  mx-auto mt-6 px-2">
      {categoryState.categories?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir kategori yok.
        </div>
      ) : (
        <div className="w-full h-[500px] overflow-y-auto flex flex-wrap items-center justify-evenly">
          {categories?.map((cat) => (
            <CategoryItem key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
