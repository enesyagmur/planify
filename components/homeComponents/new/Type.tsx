import { Dispatch, SetStateAction } from "react";

interface TypeProps {
  setValue: Dispatch<SetStateAction<object>>;
}

const Type = ({ setValue }: TypeProps) => {
  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly">
      <label htmlFor="type" className="input-label">
        Görev Tipi
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <select
          name="type"
          id=""
          className="w-5/12 rounded-sm h-7"
          onChange={(e) =>
            setValue((prevValue) => ({
              ...prevValue,
              type: e.target.value,
            }))
          }
        >
          <option className="text-start text-black">----</option>

          <option value="minute" className="text-start text-black">
            ⏳Dakika
          </option>
          <option className="text-start" value="hour">
            🕰️ Saat
          </option>
          <option className="text-start" value="repetitive">
            *️⃣ Adet
          </option>
        </select>
        <input
          type="text"
          name="type"
          className="w-6/12 pl-2 rounded-sm h-7"
          placeholder="Miktar"
          onChange={(e) =>
            setValue((prevValue) => ({
              ...prevValue,
              amount: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};

export default Type;
