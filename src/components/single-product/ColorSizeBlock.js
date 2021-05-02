const ColorSizeBlock = () => {
  return (
    <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
      <div className="flex">
        <span className="mr-3">Color</span>
        <button className="w-6 h-6 border-2 border-gray-300 rounded-full focus:outline-none"></button>
        <button className="w-6 h-6 ml-1 bg-gray-700 border-2 border-gray-300 rounded-full focus:outline-none"></button>
        <button className="w-6 h-6 ml-1 bg-indigo-500 border-2 border-gray-300 rounded-full focus:outline-none"></button>
      </div>
      <div className="flex items-center ml-6">
        <span className="mr-3">Size</span>
        <div className="relative">
          <select className="py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
            <option>SM</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
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
    </div>
  );
};

export default ColorSizeBlock;
