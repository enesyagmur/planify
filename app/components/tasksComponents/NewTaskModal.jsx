import React from "react";

// Mock kategori verisi
const categories = [
  { id: 1, name: "İş", color: "bg-purple-600" },
  { id: 2, name: "Kişisel", color: "bg-pink-500" },
  { id: 3, name: "Sağlık", color: "bg-green-500" },
  { id: 4, name: "Alışveriş", color: "bg-yellow-500" },
];

// Varsayılan değerler (görsel amaçlı)
const defaultCategory = categories[0];
const defaultCompletionType = "sureli";

const NewTaskModal = ({ onClose }) => {
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
        {/* Kapat butonu */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 text-2xl font-bold focus:outline-none transition"
          aria-label="Kapat"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
          Yeni Görev Oluştur
        </h2>

        {/* Görev İsmi */}
        <div className="mb-5">
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="taskName"
          >
            Görev İsmi <span className="text-purple-500">*</span>
          </label>
          <input
            id="taskName"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
            placeholder="Görev adını girin"
            value=""
            readOnly
          />
        </div>

        {/* Kategori Seçimi */}
        <div className="mb-5">
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="category"
          >
            Kategori
          </label>
          <div className="relative">
            <select
              id="category"
              className={`w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition pr-10`}
              value={defaultCategory.id}
              readOnly
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-900 ${defaultCategory.color}`}
              aria-label="Kategori rengi"
            />
          </div>
        </div>

        {/* Tamamlama Tipi */}
        <div className="mb-5">
          <label className="block text-gray-300 font-medium mb-1">
            Tamamlama Tipi
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-not-allowed">
              <input
                type="radio"
                name="completionType"
                value="sureli"
                checked={defaultCompletionType === "sureli"}
                className="accent-purple-600"
                readOnly
              />
              <span className="text-gray-200">Süreli</span>
            </label>
            <label className="flex items-center gap-2 cursor-not-allowed">
              <input
                type="radio"
                name="completionType"
                value="adet"
                checked={defaultCompletionType === "adet"}
                className="accent-purple-600"
                readOnly
              />
              <span className="text-gray-200">Adet</span>
            </label>
          </div>
        </div>

        {/* Süre inputu (sadece süreli seçili olarak gösteriliyor) */}
        {defaultCompletionType === "sureli" && (
          <div className="mb-5">
            <label
              className="block text-gray-300 font-medium mb-1"
              htmlFor="duration"
            >
              Süre (dakika)
            </label>
            <input
              id="duration"
              type="number"
              min={1}
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              placeholder="Örn: 30"
              value=""
              readOnly
            />
          </div>
        )}

        {/* Tamamlandı mı? */}
        <div className="mb-8 flex items-center gap-2">
          <input
            id="completed"
            type="checkbox"
            className="accent-purple-600 w-5 h-5"
            readOnly
          />
          <label
            htmlFor="completed"
            className="text-gray-200 cursor-not-allowed"
          >
            Görev tamamlandı olarak işaretle
          </label>
        </div>

        {/* Kaydet Butonu (pasif) */}
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

export default NewTaskModal;
