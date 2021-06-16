import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Youtube } from "./icons";

const Footer = ({ footer }) => {
  const { t } = useTranslation("common");

  return footer ? (
    <div className="p-6 text-white bg-gray-800 footer">
      <div className="container mx-auto">
        <div className="items-end justify-between flex-none footer-text md:flex">
          <div className="flex flex-col flex-shrink-0 text-white md:mr-20">
            <div>
              <Link href="/">
                <a>
                  <Image src={"/logo-light@2x.png"} width={120} height={50} alt={"paris est une photo"} />
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
          <div className={`flex flex-col`}>
            <p className="prose-sm">
              Bons plans, invitation au vernissage, nouvelles expositions :
              recevez une fois par mois les actus de la galerie
            </p>
            <div className="self-end">
              <form class="mt-4 flex shadow w-auto">
                <input
                  class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 bg-white focus:outline-none"
                  placeholder="votre@mail.com"
                />
                <button class="px-8 rounded-r-lg bg-brand-400 hover:bg-brand-500  text-gray-800 font-bold p-4 uppercase ring-brand-500 focus:outline-none">
                  ABONNEZ-VOUS
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between">
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
          <div>
            Conditions générales de vente Mentions légales Contact et infos
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default Footer;
