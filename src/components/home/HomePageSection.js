import { domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import ContentParser from "../ContentParser";
import LargeSlider from "../sections/LargeSlider";
import { Bouton, ThemeH2, ThemeH3, ThemeH4, ThemeH5 } from "../themeComponents";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HomePageSection = ({ homepage, products }) => {
  const defaultOptions = {
    replace: ({ attribs, children, parent, name, type }) => {
      if (!attribs) {
        return;
      }
      if (attribs["data-vc-parallax-image"]) {
        const ref = useRef(null);
        const { scrollY } = useViewportScroll();
        const { offsetTop = 2400 } = ref?.current || {};
        const [refHeight, setHeight] = useState(900);
        const y1 = useTransform(
          scrollY,
          [offsetTop - refHeight, offsetTop + refHeight],
          [-(refHeight / 2), refHeight / 2]
        );
        return (
          <div className="relative overflow-hidden safe" ref={ref}>
            <motion.div
              className="absolute inset-0"
              style={{ y: y1, scale: 1.1, filter: "blur(4px)" }}
            >
              <Image
                src={attribs["data-vc-parallax-image"] || attribs.src}
                layout="fill"
                objectFit="cover"
                alt={attribs.alt}
              />
            </motion.div>
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (name === "figure") {
        return (
          <div className="relative">
            <div
              className={`hidden md:absolute left-8 top-8 -bottom-8 -right-8 -mr-2 bg-gray-200`}
            >
              {" "}
            </div>
            <div className="relative text-center">
              {domToReact(children, defaultOptions)}
            </div>
          </div>
        );
      }
      if (name === "img") {
        return (
          <Image
            src={attribs["data-src"] || attribs.src}
            width={attribs.width}
            height={attribs.height}
            alt={attribs.alt || "paris est une photo"}
          />
        );
      }
      if (name === "i" && attribs?.class?.includes("vc_li-truck")) {
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
          </>
        );
      }
      if (name === "i" && attribs?.class?.includes("vc_li-paperplane")) {
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </>
        );
      }
      if (name === "i" && attribs?.class?.includes("vc_li-clock")) {
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </>
        );
      }
      if (name === "i" && attribs?.class?.includes("vc_li-diamond")) {
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </>
        );
      }
      if (name === "h1") {
        return (
          <h2 className={`mx-auto py-16 text-4xl max-w-2xl`}>
            {domToReact(children, defaultOptions)}
          </h2>
        );
      }
      if (name === "h2") {
        return <ThemeH2>{domToReact(children, defaultOptions)}</ThemeH2>;
      }
      if (name === "h3") {
        const alignRigth = attribs?.style === "text-align: right;";
        return (
          <div className="max-w-2xl mx-auto">
            <ThemeH5 alignRigth={alignRigth}>
              {domToReact(children, defaultOptions)}
            </ThemeH5>
          </div>
        );
      }
      if (name === "h4") {
        const alignRigth = attribs?.style === "text-align: right;";
        return (
          <h3
            className={`mx-auto px-4 py-8 text-xl max-w-2xl ${
              alignRigth ? "text-right" : ""
            }`}
          >
            {domToReact(children, defaultOptions)}
          </h3>
        );
      }
      if (name === "h5") {
        return (
          <h2 className={`mx-auto px-4 py-4 text-lg max-w-2xl`}>
            {domToReact(children, defaultOptions)}
          </h2>
        );
      }

      if (name === "p") {
        const alignRigth = attribs?.style === "text-align: right;";
        return (
          <p
            className={`md:mx-auto px-2 prose leading-5 ${
              alignRigth ? "text-right" : ""
            }`}
          >
            {domToReact(children, defaultOptions)}
          </p>
        );
      }
      if (
        attribs?.class?.includes("image-wrap") ||
        (attribs?.class?.includes("container") &&
          parent?.attribs?.class?.includes("ciloe-single-product"))
      ) {
        return (
          <div className="relative flex w-4/5 mx-auto bg-white md:mx-0 md:w-auto">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }

      if (
        attribs?.class?.includes(
          "vc_row wpb_row vc_inner vc_row-fluid vc_row-o-content-middle"
        )
      ) {
        return (
          <div className="container flex flex-col flex-wrap items-center justify-around max-w-screen-xl mx-auto sm:flex-row">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (
        attribs?.class?.includes("vc_row wpb_row vc_row-fluid") &&
        attribs?.class?.includes(
          "vc_row-no-padding vc_row-o-equal-height vc_row-o-content-middle vc_row-flex"
        )
      ) {
        return (
          <div className="container flex flex-col items-center px-4 md:flex-row md:space-x-12">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (
        attribs?.class?.includes(
          "vc_row wpb_row vc_inner vc_row-fluid vc_custom_1595971649946 vc_column-gap-15 vc_row-o-equal-height vc_row-o-content-middle vc_row-flex responsive_js_composer_custom_css_1291628821"
        )
      ) {
        return (
          <div className="flex flex-col flex-wrap items-stretch justify-around w-full mx-auto sm:flex-row">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }

      if (attribs?.class?.includes("vc_row wpb_row vc_row-fluid")) {
        return <div className="">{domToReact(children, defaultOptions)}</div>;
      }
      if (attribs?.class?.includes("wpb_row")) {
        return (
          <div className="container flex flex-col flex-wrap items-center justify-around max-w-screen-xl mx-auto sm:flex-row">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("product-info-wrap")) {
        return (
          <div className="px-4">{domToReact(children, defaultOptions)}</div>
        );
      }
      if (attribs?.class?.includes("wpb_wrapper")) {
        return (
          <div className="flex flex-col justify-between h-full">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("short-desc")) {
        return (
          <div className="leading-4">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }

      if (attribs?.class?.includes("vc_message_box-outline")) {
        return (
          <div className="flex flex-row items-center justify-start mx-2 text-gray-400 transition-colors duration-300 rounded hover:text-black hover:bg-gray-200">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("vc_section-o-content-middle")) {
        return (
          <div className="flex flex-col space-y-8">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }

      if (attribs?.class?.includes("vc_message_box-icon")) {
        return (
          <div className="px-4 md:py-4">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("vc_cta3-style-classic")) {
        return (
          <div className="bg-gray-100 border border-gray-200 rounded-md">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("vc_cta3_content-container")) {
        return (
          <div className="flex flex-row items-center p-8 md:space-x-4">
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
      if (name === "div" && attribs?.class === "vc_cta3-content") {
        return (
          <div className="font-sans text-4xl font-thin flex-shrink-1">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (name === "div" && attribs?.class === "vc_cta3-actions") {
        return (
          <div className="flex-grow-1 w-max">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (
        name === "a" &&
        (attribs?.class?.includes("block-link") ||
          attribs?.class?.includes("shop-now-link"))
      ) {
        const { href, target, title } = attribs;
        const parsedHref = href?.replace("https://photo.paris", "");
        return (
          <div className="py-4 mx-auto max-w-prose">
            <Bouton>
              <Link href={parsedHref} passHref>
                <a className="p-2 text-2xl">
                  {domToReact(children, defaultOptions)}
                </a>
              </Link>
            </Bouton>
          </div>
        );
      }
      if (name === "a" && attribs?.class?.includes("media_thumb")) {
        const { href, target, title } = attribs;
        const parsedHref = href?.replace("https://photo.paris", "");
        return (
          <Link href={parsedHref} passHref>
            <a className={href}>{domToReact(children, defaultOptions)}</a>
          </Link>
        );
      }

      if (name === "a" && parent.attribs?.class?.includes("banner-title")) {
        const { href, target, title } = attribs;
        const parsedHref = href?.replace("https://photo.paris", "");
        return (
          <Link href={parsedHref} passHref>
            <a>{domToReact(children, defaultOptions)}</a>
          </Link>
        );
      }
      if (
        (attribs?.class?.includes("vc_row") ||
          attribs?.class?.includes("wpb_row")) &&
        !attribs?.class?.includes("vc_inner ")
      ) {
        if (children.length === 0) {
          return null;
        }
        return (
          <div className="container flex flex-col items-center px-4 md:flex-row md:space-x-12">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("vc_column-inner")) {
        return (
          <div className="h-full ">{domToReact(children, defaultOptions)}</div>
        );
      }

      if (attribs?.class?.includes("ciloe-single-product")) {
        return (
          <div className="flex flex-col justify-center py-8 mx-auto lg:py-32 md:flex-row">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("flash-text")) {
        return (
          <div className="absolute px-2 pt-1 text-xs uppercase text-gray-50 top-4 right-4 bg-brand-500 rounded-xl">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }
      if (attribs?.class?.includes("product-price-wrap")) {
        return (
          <div className="text-2xl">{domToReact(children, defaultOptions)}</div>
        );
      }
      if (attribs?.class?.includes("ciloe-tabs")) {
        return (
          <div className="py-4 lg:py-32">
            <LargeSlider products={products} />
          </div>
        );
      }

      if (attribs?.class?.includes("vc_btn")) {
        const { href, target, title } = attribs;
        const parsedHref = href?.replace("https://photo.paris", "");

        return parsedHref ? (
          <a
            href={parsedHref}
            className="relative flex flex-row items-center mx-auto text-2xl md:space-x-2 w-max"
          >
            {domToReact(children, defaultOptions)}
          </a>
        ) : (
          <div className="relative flex flex-row items-center mx-auto text-2xl md:space-x-2">
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
            className={` px-2 ${
              attribs?.class.includes("vc_col-sm-12 vc_col-lg-3 vc_col-md-3")
                ? "w-full lg:w-1/4 md:w-1/2 "
                : attribs?.class.includes("vc_col-sm-3")
                ? "lg:w-1/4 md:w-1/2 w-full"
                : attribs?.class.includes(
                    "vc_col-sm-12 vc_col-lg-4 vc_col-md-6"
                  )
                ? "w-full md:1/2 lg:w-1/3 "
                : attribs?.class.includes("vc_col-sm-8")
                ? "sm:w-8/12 "
                : attribs?.class.includes("vc_col-sm-9")
                ? "w-3/4 "
                : attribs?.class.includes("vc_col-sm-12")
                ? "w-full "
                : ""
            }
      `}
          >
            {domToReact(children, defaultOptions)}
          </div>
        );
      }

      return children;
      return <>{domToReact(children, defaultOptions)}</>;
    },
  };
  return (
    <div>
      <ContentParser
        data={homepage?.content}
        options={defaultOptions}
      ></ContentParser>
    </div>
  );
};

export default HomePageSection;
