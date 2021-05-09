import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { Bouton } from "./themeComponents";

const defaultOptions = {
  replace: ({ attribs, children, name, type, data }) => {
    if (!attribs) {
      return;
    }
    if (name === "figure") {
      return (
        <div className="relative">
          <div
            className={`hidden md:absolute left-8 top-8 -bottom-8 -right-8 -mr-2 bg-gray-200`}
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
    if (name === "img") {
      return (
        <Image
          src={attribs.src}
          width={attribs.width}
          height={attribs.height}
          alt={attribs.alt}
        />
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
    if (name === "h1") {
      return (
        <h2 className={`px-4 md:px-0 mx-auto py-16 text-4xl max-w-2xl`}>
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }
    if (name === "h1" || name === "h2") {
      return (
        <h2
          className={`px-3 md:px-0 mx-auto p-4 md:p-6 lg:p-8 text-3xl max-w-2xl`}
        >
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }
    if (name === "h3") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h2
          className={`px-2 md:px-0 mx-auto py-12 text-2xl max-w-2xl ${
            alignRigth ? "md:text-right" : ""
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
          className={`px-2 md:px-0 mx-auto py-8 text-xl max-w-2xl ${
            alignRigth ? "md:text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </h3>
      );
    }
    if (name === "h5") {
      return (
        <h2 className={`px-2 md:px-0 mx-auto py-4 text-lg max-w-2xl`}>
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }

    if (name === "p") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <p
          className={`px-2 md:px-0 mx-auto prose ${
            alignRigth ? "md:text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </p>
      );
    }
    if (attribs?.class?.includes("vc_cta3-style-classic")) {
      return (
        <div className="p-4 m-4 bg-gray-100 border border-gray-200 rounded-md bg-gradient-to-br from-gray-100 to-gray-200">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("vc_cta3_content-container")) {
      return (
        <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("vc_cta3-content-header")) {
      return (
        <header className="font-thin">
          {domToReact(children, defaultOptions)}
        </header>
      );
    }
    if (name === "a" && attribs?.href?.includes("https://vimeo.com/")) {
      return (
        <div
          style={{ padding: "56.25% 0 0 0", position: "relative" }}
          className="mt-16"
        >
          <iframe
            src="https://player.vimeo.com/video/411716627"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    if (name === "div" && attribs?.class === "vc_cta3-content") {
      return (
        <div className="font-sans text-4xl font-thin flex-shrink-1">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (name === "div" && attribs?.class === "vc_cta3-actions") {
      return (
        <div className="flex-grow-1 md:w-max">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (name === "a" && attribs?.class?.includes("vc_btn3-color-turquoise")) {
      const { href, target, title } = attribs;
      const parsedHref = href?.replace("https://photo.paris", "");
      return (
        <Bouton>
          <a href={parsedHref} className="p-2 text-base">
            {domToReact(children, defaultOptions)}
          </a>
        </Bouton>
      );
    }

    if (
      attribs?.class?.includes("vc_row") ||
      attribs?.class?.includes("wpb_row")
    ) {
      return (
        <div className="container flex flex-col flex-wrap items-center max-w-screen-xl mx-auto sm:flex-row">
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
      const { href, target, title } = attribs;
      const parsedHref = href?.replace("https://photo.paris", "");

      return parsedHref ? (
        <a
          href={parsedHref}
          className="relative flex flex-row items-center mx-auto text-2xl sm:space-x-2 w-max"
        >
          {domToReact(children, defaultOptions)}
        </a>
      ) : (
        <div className="relative flex flex-row items-center mx-auto text-2xl sm:space-x-2">
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
            attribs?.class.includes("vc_col-sm-3")
              ? "sm:w-1/4"
              : attribs?.class.includes("vc_col-sm-4")
              ? "sm:w-1/3"
              : attribs?.class.includes("vc_col-sm-6")
              ? "sm:w-1/2 flex-shrink"
              : attribs?.class.includes("vc_col-sm-8")
              ? "sm:w-8/12"
              : attribs?.class.includes("vc_col-sm-9")
              ? "sm:w-3/4"
              : attribs?.class.includes("vc_col-sm-12")
              ? "w-full"
              : ""
          }
    `}
        >
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    const cleanCildren = children
      .map(({ data }) => data?.trim())
      .filter((node) => node && node !== "");
    if (cleanCildren.length > 0) {
      
    //  console.log(cleanCildren);
      return <p class="px-2 md:px-0 mx-auto prose ">{cleanCildren}</p>;
    }
    return <>{domToReact(children, defaultOptions)}</>;
  },
};

const ContentParser = ({ data, options = defaultOptions }) => {
  if (!data) {
    return null;
  }
  const parsed = parse(data, options);

  return parsed;
};

export default ContentParser;
<FiInstagram />;