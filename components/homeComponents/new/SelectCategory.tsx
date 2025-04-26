const SelectCategory = () => {
  return (
    <div className="w-11/12 h-14 flex flex-col items-start justify-between mt-2">
      <label htmlFor="title" className="input-label">
        Kategori
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <input
          type="text"
          name="title"
          className="w-7/12 pl-2 rounded-sm h-7"
          placeholder="Spor, Sağlık, Bakım vb."
        />
      </div>
    </div>
  );
};

export default SelectCategory;
