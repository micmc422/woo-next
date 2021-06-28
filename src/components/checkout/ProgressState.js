const ProgressState = ({ activeState = 0 }) => {
  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/4">
          <div className="relative mb-2">
            <div className="flex items-center justify-center w-10 h-10 mx-auto text-lg text-white bg-green-500 rounded-full">
              <span className="w-full p-2 text-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">panier</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex items-center content-center align-middle align-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div
                  className={`w-0 py-1  rounded ${
                    activeState > 0 ? "bg-green-300" : "bg-gray-200"
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div
              className={`flex items-center w-10 h-10 p-2 mx-auto text-lg text-white  rounded-full ${
                activeState > 0
                  ? "bg-green-500 text-white"
                  : "text-gray-600 ring-2 ring-gray-200"
              }`}
            >
              <span className="w-full text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">
            informations de livraisons
          </div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex items-center content-center align-middle align-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div
                  className={`w-0 py-1  rounded ${
                    activeState > 1 ? "bg-green-300" : "bg-gray-200"
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div
              className={`flex items-center w-10 h-10 p-2 mx-auto text-lg text-white  rounded-full ${
                activeState > 1
                  ? "bg-green-500 text-white"
                  : "text-gray-600 ring-2 ring-gray-200"
              }`}
            >
              <span className="w-full text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">réglement</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex items-center content-center align-middle align-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div
                  className={`w-0 py-1  rounded ${
                    activeState > 2 ? "bg-green-300" : "bg-gray-200"
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div
              className={`flex items-center w-10 h-10 p-2 mx-auto text-lg text-white  rounded-full ${
                activeState > 2
                  ? "bg-green-500 text-white"
                  : "text-gray-600 ring-2 ring-gray-200"
              }`}
            >
              <span className="w-full text-center">
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Finished</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressState;
