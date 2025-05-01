import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";

interface Icons {
  id: string;
  icon: string;
}

interface IconProps {
  setValue: Dispatch<SetStateAction<string>>;
}

const Icon = ({ setValue }: IconProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [iconList, setIconList] = useState<Icons[]>([]);

  const handleClick = (icon: string) => {
    setOpen(false);
    setValue(icon);
  };

  async function fetchIcons() {
    setOpen(true);
    if (iconList.length === 0) {
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
  }

  return (
    <>
      <div
        className="w-4/12 h-20 flex flex-col items-start justify-evenly text-white ml-2 "
        onClick={() => setOpen(!open)}
      >
        <label htmlFor="title" className="input-label ">
          ikon
        </label>
        <button
          className={`w-full h-8 mb-1 flex items-center justify-center  rounded-sm text-2xl  ${
            open
              ? "bg-mainBackground text-secondTextColor border-[1px] border-secondTextColor"
              : "bg-secondBackground text-secondTextColor"
          }  hover:bg-darkGreen hover:text-mainBackground`}
          onClick={fetchIcons}
        >
          <RxDropdownMenu />
        </button>
      </div>

      {open ? (
        <div className="w-11/12 h-full flex flex-wrap items-center justify-center absolute top-20 left-auto text-white bg-secondBackground rounded-md bg-opacity-95 z-10">
          {iconList.map((item) => (
            <button
              className="w-[40px] h-[40px] rounded-sm  text-3xl flex items-center justify-center hover:bg-darkGreen"
              key={item.id}
              onClick={() => handleClick(item.icon)}
            >
              {item.icon}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Icon;
