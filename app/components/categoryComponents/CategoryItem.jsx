import React from "react";

const CategoryItem = ({ category }) => {
  return (
    <div
      className={`w-96
    relative flex items-center justify-between
    bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-5 mb-4
    border border-gray-800 hover:border-purple-500/40
    transition-all duration-300 hover:shadow-purple-500/20
    hover:scale-[1.02] group cursor-pointer
    before:absolute before:inset-0 before:rounded-2xl 
    before:bg-gradient-to-r before:from-purple-500/5 before:to-transparent 
    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
  `}
    >
      {/* Sol kenar gradient çizgisi */}
      <div
        className={`absolute left-0 top-3 bottom-3 w-1 ${category.color.replace(
          "border-",
          "bg-"
        )} rounded-full shadow-lg`}
      ></div>

      <div className="flex items-center gap-4 ml-2">
        {/* Kategori renk göstergesi */}
        <div className="relative">
          <div
            className={`w-6 h-6 rounded-full ${category.color.replace(
              "border-",
              "bg-"
            )} 
                   shadow-lg ring-2 ring-gray-700 group-hover:ring-purple-500/50 
                   transition-all duration-300 group-hover:scale-110`}
          />
          {/* İç nokta efekti */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Kategori adı */}
        <div className="flex flex-col">
          <span className="text-white font-semibold capitalize text-lg group-hover:text-purple-100 transition-colors duration-200">
            {category.name}
          </span>
          {/* Alt bilgi - isteğe bağlı */}
          <span className="text-gray-400 text-sm opacity-70 capitalize group-hover:opacity-100 transition-opacity duration-300">
            {category.description}
          </span>
        </div>
      </div>

      {/* Sağ taraf - Aksiyon butonları */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-purple-600 hover:text-white 
                 transition-all duration-200 transform hover:scale-105 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Kategoriyi düzenle"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          className="p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-red-600 hover:text-white 
                 transition-all duration-200 transform hover:scale-105 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Kategoriyi sil"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Hover için gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-transparent to-purple-500/0 
                  group-hover:from-purple-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"
      ></div>

      {/* Işık efekti */}
      <div
        className="absolute top-0 left-4 w-20 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>
  );
};

export default CategoryItem;
