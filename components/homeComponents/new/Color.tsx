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

  const showClasses = [
    "bg-lime-400",
    "bg-emerald-500",
    "bg-amber-950",
    "bg-orange-600",
    "bg-amber-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-zinc-700",
    "bg-red-600",
    "bg-sky-500",
    "bg-blue-500",
  ];

  const fetchColors = async () => {
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
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="w-11/12 h-14 flex flex-col items-start justify-between mt-2">
      <div className="hidden"></div>
      <label htmlFor="title" className="input-label">
        Renk
      </label>

      <div className="w-full flex items-center justify-between rounded-sm h-7">
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
