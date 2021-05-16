import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Youtube } from "./icons";

const Footer = ({ footer }) => {
  const { t } = useTranslation("common");

  return (
    <div className="p-6 text-white bg-gray-800 footer">
      <div className="container mx-auto">
        <div className="items-center justify-between flex-none footer-text md:flex">
          <div className="flex flex-col flex-shrink-0 mr-20 text-white">
            <div>
              <Link href="/">
                <Image src={"/logo-light@2x.png"} width={120} height={50} />
              </Link>
            </div>
            <span
              className="w-64"
              dangerouslySetInnerHTML={{ __html: t("adresse") }}
            ></span>
            <span> {t("num-tel")}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: footer?.sidebarOne }}></div>
          <div dangerouslySetInnerHTML={{ __html: footer?.sidebarTwo }}></div>
        </div>
        <ul className="flex mt-8 social-links align-center">
          <li>
            <a
              href="https://www.facebook.com/codeytek"
              className="fa fa-facebook"
              target="_blank"
            >
              <Facebook />
            </a>
          </li>
          <li className="mt-1 ml-2">
            <a href="https://twitter.com/codeytek" target="_blank">
              <Twitter />
            </a>
          </li>
          <li className="mt-1 ml-2">
            <a
              href="https://youtube.com/ImranSayedDev"
              className="fa fa-youtube"
              target="_blank"
            >
              <Youtube />
            </a>
          </li>
          <li className="ml-2">
            <a
              href="https://www.instagram.com/codeytek_academy/"
              className="fa fa-instagram"
              target="_blank"
            >
              <Instagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
