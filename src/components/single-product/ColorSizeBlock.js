const ColorSizeBlock = ({
  setActiveVariations,
  variations,
  activeVariations,
  colors,
}) => {
  return (
    <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
      {colors && (
        <div className="flex">
          <span className="mr-3">Color</span>
          <button className="w-6 h-6 border-2 border-gray-300 rounded-full focus:outline-none"></button>
          <button className="w-6 h-6 ml-1 bg-gray-700 border-2 border-gray-300 rounded-full focus:outline-none"></button>
          <button className="w-6 h-6 ml-1 bg-indigo-500 border-2 border-gray-300 rounded-full focus:outline-none"></button>
        </div>
      )}
      {variations?.length > 0 && (
        <>
          <div className="flex flex-wrap items-center w-full md:hidden">
            <div className="relative max-w-full">
              <select
                className="max-w-full py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500"
                onChange={(e) =>
                  setActiveVariations(variations[e.target.value])
                }
              >
                {variations.map((item, i) => (
                  <option
                    key={`size-selector${item.id}`}
                    value={i}
                    className={`my-1 truncate `}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="items-center hidden md:flex">
            <div className="relative">
              <ul className="py-2 pl-3 pr-10 text-base ">
                {variations.map((item, i) => (
                  <li
                    className={`my-2 p-2 hover:bg-brand-400 transition-colors bg-gray-300 rounded hover:text-white hover:font-bold ${
                      activeVariations?.id === item.id
                        ? "bg-brand-500 font-bold text-white"
                        : ""
                    }`}
                    onClick={(e) =>
                      setActiveVariations(variations[e.target.value])
                    }
                    key={`size-selector-desktop-${item.id}`}
                    value={i}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorSizeBlock;
