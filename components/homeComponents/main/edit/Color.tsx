import { db } from "@/lib/firebase";
import { Task } from "@/lib/types";
import { collection, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Color {
  id: string;
  color: string;
}

interface ColorProps {
  oldTask: Task;
  setNewTask: Dispatch<SetStateAction<Task>>;
}
const Color = ({ oldTask, setNewTask }: ColorProps) => {
  const [colorList, setColorList] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(oldTask?.color);

  const fetchColors = async () => {
    if (colorList.length === 0) {
      try {
        const colorsCollection = collection(db, "colors");
        const colorSnapshot = await getDocs(colorsCollection);
        const result: Color[] = colorSnapshot.docs.map((doc) => ({
          ...(doc.data() as Color),
        }));
        setColorList(result);
      } catch (error) {
        console.error("Renkleri Çekerken hata: ", error);
      }
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (selectedColor) {
      setNewTask((prewTask: Task) => ({
        ...prewTask,
        color: selectedColor,
      }));
    }
  }, [selectedColor]);

  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-center ">
      <label
        htmlFor="title"
        className="input-label mb-1 cursor-help"
        title="Görev Rengi Seçiniz"
      >
        Görev Tema Rengi
      </label>

      <div className="w-full flex items-center justify-between rounded-sm h-7 mb-3">
        {colorList &&
          colorList.map((item) => (
            <button
              name="color"
              className={`color-button ${item.color}  ${
                oldTask?.color === item.color
                  ? "border-[3px] border-secondTextColor"
                  : ""
              }`}
              key={item.id + item.color}
              onClick={() => setSelectedColor(item.color)}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default Color;
