import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Color {
  id: string;
  color: string;
}

interface ColorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Color = ({ value, setValue }: ColorProps) => {
  const [colorList, setColorList] = useState<Color[]>([]);

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
                value === item.color
                  ? "border-[3px] border-secondTextColor"
                  : ""
              }`}
              key={item.id + item.color}
              onClick={() => setValue(item.color)}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default Color;
