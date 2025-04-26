const Color = () => {
  return (
    <div className="w-11/12 h-14 flex flex-col items-start justify-between mt-2">
      <label htmlFor="title" className="input-label">
        Renk
      </label>

      <div className="w-full flex items-center justify-between rounded-sm h-7">
        <button className="color-button bg-sky-500"></button>
        <button className="color-button bg-blue-500"></button>
        <button className="color-button bg-emerald-500"></button>
        <button className="color-button bg-lime-400"></button>
        <button className="color-button bg-violet-500"></button>
        <button className="color-button bg-fuchsia-500"></button>
        <button className="color-button bg-amber-500"></button>
        <button className="color-button bg-orange-600"></button>
        <button className="color-button bg-amber-950"></button>
        <button className="color-button bg-red-600"></button>
        <button className="color-button bg-zinc-700"></button>
      </div>
    </div>
  );
};

export default Color;
