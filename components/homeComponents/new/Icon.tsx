import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";

interface Icons {
  id: string;
  icon: string;
}

const Icon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [iconList, setIconList] = useState<Icons[]>([]);

  const handleClick = () => {
    setOpen(false);
  };

  async function fetchIcons() {
    setOpen(true);
    try {
      const querySnapShot = await getDocs(collection(db, "icons"));
      const result: Icons[] = querySnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          icon: data.icon as string,
        };
      });
      setIconList(result);
    } catch (err) {
      console.error("İkonlar alınırken hata: ", err);
    }
  }

  if (open === false) {
    return (
      <div className="w-4/12 h-14 flex flex-col items-start justify-between text-white ml-2">
        <label htmlFor="title" className="input-label">
          ikon
        </label>
        <button
          className="w-full h-8 flex items-center justify-center bg-secondBackground rounded-sm text-2xl text-mainTextColor hover:bg-darkGreen hover:text-mainBackground"
          onClick={fetchIcons}
        >
          <RxDropdownMenu />
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-wrap items-center justify-center absolute top-0 left-0 text-white bg-secondBackground rounded-md bg-opacity-95 z-10">
        {iconList.map((item) => (
          <button
            className="w-8 h-8 rounded-sm m-2 text-2xl flex items-center justify-center hover:bg-darkGreen"
            key={item.id}
            onClick={handleClick}
          >
            {item.icon}
          </button>
        ))}
      </div>
    );
  }
};

export default Icon;
