import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram } from "./icons";
import { Bouton } from "../components/themeComponents"
const Footer = ({ footer, legal }) => {
  const { t } = useTranslation("common");
  if (!footer) {
    return <div></div>;
  }
  return (
    <div className="p-6 text-white bg-gray-800 footer">
      <div className="container mx-auto">
        <div className="items-end justify-between flex-none footer-text md:flex">
          <div className="flex flex-col flex-shrink-0 text-white md:mr-20">
            <div>
              <Link href="/">
                <a>
                  <Image
                    src={"/logo-light@2x.png"}
                    width={120}
                    height={50}
                    alt={"paris est une photo"}
                  />
                </a>
              </Link>
            </div>
            <span
              className="w-full sm:w-64"
              dangerouslySetInnerHTML={{ __html: t("adresse") }}
            ></span>
            <span> {t("num-tel")}</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: footer?.sidebarOne || "" }}
          ></div>
          <div
            dangerouslySetInnerHTML={{ __html: footer?.sidebarTwo || "" }}
          ></div>
          <div className={`flex flex-col w-full lg:w-1/3 pt-8 md:pt-0`}>
            <div>
              <Bouton>
                <h3 className="pb-4 text-2xl">Newletter</h3>
              </Bouton>
              <p className="pt-4 prose-sm">
                Bons plans, invitation au vernissage, nouvelles expositions :
                recevez une fois par mois les actus de la galerie
              </p>
            </div>
            <div className="">
              <form className="flex w-full mt-4 shadow">
                <input
                  className="flex-grow p-2 mr-0 text-gray-800 bg-white border-t border-b border-l rounded-l-lg md:p-4 focus:outline-none"
                  placeholder="votre@mail.com"
                />
                <button
                  className="px-1 text-xs font-bold text-gray-800 uppercase rounded-r-lg md:px-8 bg-brand-400 hover:bg-brand-500 ring-brand-500 focus:outline-none md:text-base"
                  aria-label="Abonnement à la newsletter"
                >
                  ABONNEZ-VOUS
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between space-y-8 md:items-end md:flex-row md:space-y-0">
          <ul className="flex mt-8 social-links align-center">
            <li>
              <a
                href="https://fr-fr.facebook.com/galerieparisestunephoto/"
                target="_blank"
                className="hover:text-brand-500"
                rel="noopener"
              >
                <Facebook />
              </a>
            </li>

            <li className="ml-2">
              <a
                href="https://www.instagram.com/parisestunephoto/"
                target="_blank"
                className="hover:text-brand-500"
                rel="noopener"
              >
                <Instagram />
              </a>
            </li>
          </ul>
          <div className="flex flex-col flex-wrap justify-end md:flex-row md:space-x-2 ">
            <Legal legal={legal} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Legal = ({ legal }) => {
  const [jsx, setJsx] = useState("");
  const Construct = () => {
    const jsxArray = [];
    legal.map((el, i) => {
      jsxArray.push(
        <Link href={el.path} key={i} passHref>
          <a className="text-gray-400 transition transform hover:-translate-y-1">
            {el.label}
          </a>
        </Link>
      );
    });
    setJsx(jsxArray);
  };
  useEffect(() => {
    legal?.length && Construct();
  }, [legal.length]);
  return jsx;
};
export default Footer;
