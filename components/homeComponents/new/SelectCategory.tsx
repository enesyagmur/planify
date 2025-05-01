import { Dispatch, SetStateAction } from "react";

interface CategoryProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SelectCategory = ({ value, setValue }: CategoryProps) => {
  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly">
      <label htmlFor="category" className="input-label">
        Kategori
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <input
          type="text"
          name="category"
          className="w-full pl-2 rounded-sm h-7 capitalize"
          placeholder="Spor, Sağlık, Bakım vb."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
};

export default SelectCategory;
