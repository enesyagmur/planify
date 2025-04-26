const Type = () => {
  return (
    <div className="w-11/12 h-14 flex flex-col items-start justify-between mt-4">
      <label htmlFor="title" className="input-label">
        Görev Tipi
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <select name="" id="" className="w-5/12 rounded-sm h-7">
          <option value="" className="text-start text-black">
            ⏳Dakika
          </option>
          <option className="text-start" value="">
            🕰️ Saat
          </option>
          <option className="text-start" value="">
            *️⃣ Adet
          </option>
        </select>
        <input
          type="text"
          name="title"
          className="w-6/12 pl-2 rounded-sm h-7"
          placeholder="Miktar"
        />
      </div>
    </div>
  );
};

export default Type;
