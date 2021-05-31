import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import { BiLayerMinus, BiLayerPlus } from "react-icons/bi";
const ColorSizeBlock = ({
  setActiveVariations,
  variations,
  activeVariations,
  colors,
  productName,
}) => {
  const [type, setType] = useState(true);
  const cadresVal = ["Frame", "Cadre"];
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
            <div className="relative w-full">
              <select
                className="w-full py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500"
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
              <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-300 pointer-events-none">
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
          <div className="items-center hidden md:inline-block">
            <div className="relative">
              {variations.filter((elem) =>
                cadresVal.some((el) => elem.name.includes(el))
              ).length > 0 && (
                <div
                  className={`relative inline-block ml-3  rounded-full bg-opacity-50 shadow-inner ${
                    !type ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  <div
                    className={`flex my-1 bg-white rounded-full shadow-lg transition-all px-3 ${
                      type ? "ml-4 mr-2" : "mr-4 ml-2"
                    }`}
                    onClick={() => setType(!type)}
                  >
                    {type ? (
                      <BiLayerMinus size={24} />
                    ) : (
                      <BiLayerPlus size={24} />
                    )}
                  </div>
                </div>
              )}
              <AnimateSharedLayout>
                <motion.ul layout className="py-2 pl-3 pr-10 text-base ">
                  {variations
                    .filter(
                      (elem) =>
                        cadresVal.some((el) => elem.name.includes(el)) !== type
                    )
                    .map((item, i) => {
                      const name =
                        item.name
                          .replace(productName, "")
                          .replace(" - ", "") !== ""
                          ? item.name
                              .replace(productName, "")
                              .replace(" - ", "")
                          : item.name;

                      console.log(item, name);
                      return (
                        <motion.li
                          layoutId={item.id}
                          className={`my-1 p-2 hover:bg-brand-400 transition-colors bg-gray-200 rounded hover:text-white hover:font-bold ${
                            activeVariations?.id === item.id
                              ? "bg-brand-300  text-white"
                              : ""
                          }`}
                          onClick={(e) =>
                            setActiveVariations(variations[e.target.value])
                          }
                          key={`size-selector-desktop-${item.id}`}
                          value={i}
                        >
                          {name}
                        </motion.li>
                      );
                    })}
                </motion.ul>
              </AnimateSharedLayout>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorSizeBlock;
