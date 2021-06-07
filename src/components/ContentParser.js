import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import {
  FaEuroSign,
  FaRegClock,
  FaCropAlt,
  FaRegComments,
} from "react-icons/fa";
import { Bouton } from "./themeComponents";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { uniqueId } from "lodash";
import Link from "next/link";

const parentAnimation = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, bounce: false } },
  exit: {},
};
const childAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

const defaultOptions = {
  replace: ({ attribs, children, parent, name, type, data }) => {
    if (!attribs) {
      return;
    }
    if (name === "figure") {
      return (
        <div className="relative">
          <div
            className={`hidden md:absolute left-8 top-8 -bottom-8 -right-8 -mr-2 bg-gray-300`}
          >
            {" "}
          </div>
          <div className="relative px-0 md:px-4">
            {" "}
            {domToReact(children, defaultOptions)}
          </div>
        </div>
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
    if (
      attribs?.class?.includes("vc_message_box-outline vc_message_box-round")
    ) {
      return (
        <div className="flex flex-row items-center justify-center mr-2 text-gray-400 transition-colors duration-300 rounded hover:text-black hover:bg-gray-200">
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

    if (name === "p" && parent.attribs?.class?.includes("vc_message_box")) {
      return (
        <div className="px-4 md:py-4">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }

    if (name === "i" && attribs?.class?.includes("fa-euro-sign")) {
      return (
        <>
          <FaEuroSign />
        </>
      );
    }
    if (name === "span" && attribs?.class?.includes("vc_icon_element-icon")) {
      return (
        <div className={`p-2`}>
          <FaRegClock size={32} />
        </div>
      );
    }
    if (
      (name === "i" && attribs?.class?.includes("fa-clock")) ||
      attribs?.class?.includes("fa-clock-o")
    ) {
      return (
        <>
          <FaRegClock />
        </>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-crop-alt")) {
      return (
        <>
          <FaCropAlt />
        </>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-comments")) {
      return (
        <>
          <FaRegComments />
        </>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-instagram")) {
      return (
        <>
          <FiInstagram />
        </>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-facebook")) {
      return (
        <>
          <FiFacebook />
        </>
      );
    }
    if (name === "h1") {
      return (
        <h2 className={`px-4 mx-auto py-16 text-4xl max-w-2xl`}>
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }
    if (name === "h1" || name === "h2" || name === "h3") {
      const alignRigth = attribs?.style === "text-align: right;";

      return (
        <motion.h2
          variants={childAnimation}
          className={`px-4 mx-auto text-2xl max-w-2xl w-full ${
            alignRigth ? "md:text-right" : ""
          }`}
          key={uniqueId()}
        >
          {domToReact(children, defaultOptions)}
        </motion.h2>
      );
    }
    if (name === "h4") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h3
          className={`px-4 mx-auto py-8 text-xl max-w-2xl ${
            alignRigth ? "md:text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </h3>
      );
    }
    if (name === "h5") {
      return (
        <h2 className={`px-4 mx-auto py-4 text-lg max-w-2xl`}>
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }
    if (attribs?.class === "container") {
      return (
        <div className="px-0 mx-auto prose">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (name === "b" || name === "strong") {
      return <b>{domToReact(children, defaultOptions)}</b>;
    }
    if (name === "i" || name === "i") {
      return <i>{domToReact(children, defaultOptions)}</i>;
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
    if (name === "a" && attribs?.class?.includes("social-item")) {
      const { href, target, title } = attribs;
      const parsedHref = href?.replace("https://photo.paris", "");
      return (
        <div className="py-4 mx-auto max-w-prose">
          <Bouton small={true}>
            <Link href={parsedHref} passHref>
              <a className="p-2 text-2xl">
                {domToReact(children, defaultOptions)}
              </a>
            </Link>
          </Bouton>
        </div>
      );
    }
    if (attribs?.class === "socials") {
      return (
        <div className="flex flex-row">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (
      attribs?.class?.includes("wpb_map_wraper") ||
      attribs?.class?.includes("ciloe-google-maps")
    ) {
      return (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.232743990237!2d2.3399348158538786!3d48.87283950764294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3eec51010d%3A0xb15c5adcde3bfab1!2sParis%20est%20une%20photo%20-%20Galerie%20art%20et%20encadrement!5e0!3m2!1sfr!2sfr!4v1590146273170!5m2!1sfr!2sfr"
          width="600"
          height="450"
          frameborder="0"
          style={{ border: "0px", pointerEvents: "none" }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      );
    }

    if (name === "p" && !parent.attribs?.class?.includes("vc_message_box")) {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <motion.div
          variants={childAnimation}
          className={`p-4 mx-auto prose ${alignRigth ? "md:text-right" : ""}`}
          key={uniqueId()}
        >
          {domToReact(children, defaultOptions)}
        </motion.div>
      );
    }
    if (name === "ul") {
      return (
        <ul className="mx-auto prose">
          {" "}
          {domToReact(children, defaultOptions)}
        </ul>
      );
    }
    if (name === "li") {
      return <li> {domToReact(children, defaultOptions)}</li>;
    }
    if (attribs?.class?.includes("vc_cta3-style-classic")) {
      if (attribs?.class?.includes("vc_general")) {
        return (
          <div className="p-4 mx-auto text-white bg-gray-100 border rounded-md shadow-lg border-brand-200 bg-gradient-to-br from-brand-300 to-brand-400 w-min">
            {domToReact(children, defaultOptions)}
          </div>
        );
      }

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
    if (name === "a" && attribs?.class?.includes("vc_btn3")) {
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
        <div className="container flex flex-col flex-wrap items-center justify-around max-w-screen-xl mx-auto sm:flex-row">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("vc_column-inner")) {
      return (
        <div className="mx-auto space-y-4">{domToReact(children, defaultOptions)}</div>
      );
    }
    if (attribs?.class?.includes("vc_btn")) {
      const { href, target, title } = attribs;
      const parsedHref = href?.replace("https://photo.paris", "");
      if (attribs?.href?.includes("facebook.com/galerieparisestunephoto")) {
        return (
          <Bouton circleClass="bg-facebook">
            <a className="flex" href={attribs?.href}>
              {domToReact(children, defaultOptions)}
            </a>
          </Bouton>
        );
      }
      if (
        attribs?.href?.includes("https://www.instagram.com/parisestunephoto")
      ) {
        return (
          <Bouton circleClass="bg-instagram">
            <a className="flex" href={attribs?.href}>
              {domToReact(children, defaultOptions)}
            </a>
          </Bouton>
        );
      }

      return parsedHref ? (
        <a
          href={parsedHref}
          className="relative flex flex-row items-center mx-auto text-2xl w-max"
        >
          {domToReact(children, defaultOptions)}
        </a>
      ) : (
        <div className="relative flex flex-row items-center mx-auto text-2xl">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (
      attribs?.class?.includes("wpb_column") ||
      attribs?.class?.includes("vc_column_container")
    ) {
      return (
        <InView threshold={0.1}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              animate={inView ? "animate" : "initial"}
              variants={childAnimation}
              className={`safe pb-4 md:pb-8 lg:pb-16 ${
                attribs?.class.includes("vc_col-sm-3")
                  ? "sm:w-1/4"
                  : attribs?.class.includes("vc_col-sm-4")
                  ? "sm:w-1/3"
                  : attribs?.class.includes("vc_col-sm-6")
                  ? "sm:w-1/2 flex-shrink"
                  : attribs?.class.includes("vc_col-sm-5")
                  ? "sm:w-1/2 flex-shrink"
                  : attribs?.class.includes("vc_col-sm-8")
                  ? "sm:w-2/3 "
                  : attribs?.class.includes("vc_col-sm-9")
                  ? "sm:w-3/4"
                  : attribs?.class.includes("vc_col-sm-12")
                  ? "w-full"
                  : "w-auto flex-shrink"
              }
                `}
            >
              {domToReact(children, defaultOptions)}
            </motion.div>
          )}
        </InView>
      );
    }
    if (name === "a") {
      if (attribs) {
        return (
          <Link href={attribs.href} passHref>
            <a>{domToReact(children, defaultOptions)}</a>
          </Link>
        );
      }

      if (
        children?.length > 0 &&
        "https://www.facebook.com/galerieparisestunephoto/" === children[0].data
      ) {
        return (
          <Bouton circleClass="bg-facebook bg-opacity-75">
            <a href={children[0].data}>Facebook</a>
          </Bouton>
        );
      }
      if (
        children?.length > 0 &&
        "https://www.instagram.com/parisestunephoto" === children[0].data
      ) {
        return (
          <Bouton circleClass="bg-instagram bg-opacity-75">
            <a href={children[0].data}>Instagram</a>
          </Bouton>
        );
      }
    }
    return <>{domToReact(children, defaultOptions)}</>;
  },
};

const ContentParser = ({ data, children, options = defaultOptions }) => {
  if (!data) {
    return <div />;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={parentAnimation}
      key={uniqueId()}
    >
      {parse(data, options)}
    </motion.div>
  );
};

export default ContentParser;
