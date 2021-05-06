import parse, { domToReact } from "html-react-parser";
import { FiInstagram, FiFacebook } from "react-icons/fi";

const defaultOptions = {
  replace: ({ attribs, children, name }) => {
    if (!attribs) {
      return;
    }
    if (name === "figure") {
      return (
        <div className="relative">
          <div
            className={`absolute left-8 top-8 -bottom-8 -right-8 -mr-2 bg-gray-200`}
          >
            {" "}
          </div>
          <div className="relative">
            {" "}
            {domToReact(children, defaultOptions)}
          </div>
        </div>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-instagram")) {
      return (
        <>
          <div
            style={{ backgroundColor: "#c13584", zIndex: -1 }}
            className={`absolute inset-0 -mr-2 rounded-md ring-2 ring-red-800 ring-opacity-40`}
          ></div>
          <FiInstagram />
        </>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-facebook")) {
      return (
        <>
          {" "}
          <div
            style={{ backgroundColor: "#3b5998", zIndex: -1 }}
            className={`absolute inset-0 -mr-2 rounded-md ring-2 ring-blue-800 ring-opacity-40`}
          ></div>
          <FiFacebook />
        </>
      );
    }
    if (name === "h3") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h2
          className={`mx-auto py-16 text-4xl max-w-2xl ${
            alignRigth ? "text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }
    if (name === "h4") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h3
          className={`mx-auto py-8 text-2xl max-w-2xl ${
            alignRigth ? "text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </h3>
      );
    }
    if (name === "p") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <p className={`mx-auto prose ${alignRigth ? "text-right" : ""}`}>
          {domToReact(children, defaultOptions)}
        </p>
      );
    }

    if (
      attribs?.class?.includes("vc_row") ||
      attribs?.class?.includes("wpb_row")
    ) {
      return (
        <div className="container flex flex-row items-center max-w-screen-xl mx-auto space-x-12">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("vc_column-inner")) {
      return (
        <div className="pb-16">{domToReact(children, defaultOptions)}</div>
      );
    }
    if (attribs?.class?.includes("vc_btn")) {
    //  console.log(attribs);
      const { href, target, title } = attribs;

      return href ? (
        <a
          href={href}
          className="relative flex flex-row items-center mx-auto space-x-2 text-2xl text-gray-200"
        >
          {domToReact(children, defaultOptions)}
        </a>
      ) : (
        <div className="relative flex flex-row items-center mx-auto space-x-2 text-2xl text-gray-200">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (
      attribs?.class?.includes("wpb_column") ||
      attribs?.class?.includes("vc_column_container")
    ) {
      return (
        <div
          className={`${
            attribs?.class.includes("vc_col-sm-3") ? "w-1/4" : ""
          } ${attribs?.class.includes("vc_col-sm-4") ? "w-1/3" : ""} ${
            attribs?.class.includes("vc_col-sm-6") ? "w-1/2 flex-shrink" : ""
          } ${attribs?.class.includes("vc_col-sm-8") ? "w-8/12" : ""} ${
            attribs?.class.includes("vc_col-sm-9") ? "w-3/4" : ""
          } ${attribs?.class.includes("vc_col-sm-12") ? "w-full" : " "}
    `}
        >
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
  },
};

const ContentParser = ({ data, options }) => {
  // console.log(data);
  if (!data) {
    return null;
  }
  const parsed = parse(data, { ...defaultOptions, ...options });

  return parsed;
};

export default ContentParser;
<FiInstagram />;
