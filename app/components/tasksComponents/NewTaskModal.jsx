import { fetchCategoriesThunk } from "../../features/category/categoryThunk";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialTaskState, taskReducer } from "./taskReducer";
import { addNewTaskTemplateThunk } from "../../features/task/taskThunk";

const NewTaskModal = ({ onClose, userId }) => {
  const { categories, loading, error } = useSelector(
    (state) => state.categoryState
  );
  const [formState, dispatchForm] = useReducer(taskReducer, initialTaskState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!userId) {
        throw new Error("Kullanıcı Id Eksik");
      }
      await dispatch(fetchCategoriesThunk(userId)).unwrap();
    };
    if (categories?.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  console.log(formState);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const findCategory = categories.find(
        (cat) => cat.id === formState.categoryId
      );
      const newTask = {
        name: formState.name,
        category: findCategory,
        completionType: formState.completionType,
        duration: formState.duration,
        completed: formState.completed,
      };

      const data = { userId: userId, newTask: newTask };
      await dispatch(addNewTaskTemplateThunk(data)).unwrap();
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
      {!loading && categories.length === 0 && (
        <div className="flex flex-col items-center justify-evenly gap-2">
          <h1>Kategori Bulunamadı</h1>
          <p>Görev oluşturmak için önce kategori oluşturmalısınız</p>
          <Link href={"/category"}>Kategori Oluştur</Link>
        </div>
      )}
      {/* Modal kutusu */}
      <form
        className="relative z-10 bg-gray-900 dark:bg-black rounded-2xl shadow-xl p-6 w-full max-w-md mx-2 transition border border-gray-800"
        autoComplete="off"
        onSubmit={onSubmit}
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
            htmlFor="name"
          >
            Görev İsmi <span className="text-purple-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 capitalize rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
            placeholder="Görev adını girin"
            value={formState.name}
            onChange={(e) =>
              dispatchForm({
                type: "SET_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
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
            {loading ? (
              <p>Yükleniyor...</p>
            ) : (
              <select
                onChange={(e) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "categoryId",
                    value: e.target.value,
                  })
                }
                id="category"
                className={`w-full px-3 py-2 capitalize rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition pr-10`}
              >
                <option value="">Kategori Seçiniz</option>
                {categories?.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className={`${cat.color} capitalize hover:none active:none focus:none`}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Tamamlama Tipi */}
        <div className="mb-5">
          <label className="block text-gray-300 font-medium mb-1">
            Tamamlama Tipi
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 ">
              <input
                type="radio"
                name="completionType"
                value="temporary"
                className="accent-purple-600"
                onChange={(e) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "completionType",
                    value: "temporary",
                  })
                }
              />
              <span className="text-gray-200">Süreli</span>
            </label>
            <label className="flex items-center gap-2 ">
              <input
                type="radio"
                name="completionType"
                value="expedition"
                className="accent-purple-600"
                onChange={(e) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "completionType",
                    value: "expedition",
                  })
                }
              />
              <span className="text-gray-200">Adet</span>
            </label>
          </div>
        </div>

        {formState.completionType === "temporary" && (
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
              value={formState.duration}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "duration",
                  value: e.target.value,
                })
              }
            />
          </div>
        )}

        {/* Günlük tekrar etsin mi */}
        <div className="mb-8 flex items-center gap-2">
          <input
            id="isRecurring"
            type="checkbox"
            className="accent-purple-600 w-5 h-5"
            defaultValue={formState.isRecurring}
            onChange={(e) =>
              dispatchForm({
                type: "SET_FIELD",
                field: "isRecurring",
                value: e.target.checked,
              })
            }
          />
          <label htmlFor="isRecurring" className="text-gray-200 ">
            Hergün Tekrar
          </label>
        </div>

        {/* Tamamlandı mı? */}
        <div className="mb-8 flex items-center gap-2">
          <input
            id="completed"
            type="checkbox"
            className="accent-purple-600 w-5 h-5"
            defaultValue={formState.completed}
            onChange={(e) =>
              dispatchForm({
                type: "SET_FIELD",
                field: "completed",
                value: e.target.checked,
              })
            }
          />
          <label htmlFor="completed" className="text-gray-200 ">
            Tamamlandı
          </label>
        </div>

        {/* Kaydet Butonu (pasif) */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-md opacity-70"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default NewTaskModal;

//verileri reducer ile yakalayacağım
