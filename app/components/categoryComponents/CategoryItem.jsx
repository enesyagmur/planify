import React from "react";

const CategoryItem = ({ category }) => {
  return (
    <div
      className={`
        flex items-center justify-between
        bg-gray-900  rounded-xl shadow-lg p-4 mb-4
        border-l-4 ${category.color}
        transition hover:shadow-xl
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full ${category.color} border-2 border-gray-900`}
        />
        <span className="text-white font-medium">{category.name}</span>
      </div>
      {/* İleride düzenle/sil butonları eklenebilir */}
    </div>
  );
};

export default CategoryItem;
