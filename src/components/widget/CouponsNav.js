import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiBellFill } from "react-icons/ri";
import { BgPattern } from "../themeComponents";
const sampleData = [
  {
    amount: 10,
    code: "welcome",
    dateExpiry: null,
    description: null,
    discountType: "PERCENT",
    excludeSaleItems: true,
    freeShipping: false,
    individualUse: true,
    maximumAmount: null,
    minimumAmount: null,
    usageCount: 20,
    usageLimit: null,
    usageLimitPerUser: 1,
  },
];

const CouponsNav = ({ coupons }) => {
  const { t } = useTranslation("shop");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      const timeOut = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [open]);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="coupons-pop-up"
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -100,
            }}
            className="absolute top-0 right-0 z-50"
            onClick={() => setOpen(false)}
          >
            <div className="relative px-6 py-4 m-2 mb-4 text-white border-0 rounded shadow-lg bg-brand-500">
              <BgPattern color={"c9a338"} />

              <div className="relative flex items-center">
                <span className="inline-block mr-5 text-xl align-middle">
                  <RiBellFill />
                </span>
                <span className="inline-block mr-8 align-middle">
                  <b className="capitalize">Copié !</b> Visitez la boutique pour
                  utiliser le code{" "}
                  <span className={`bg-green-500 rounded-full px-1 shadow`}>
                    {sampleData[0].code}
                  </span>{" "}
                  !
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CopyToClipboard text={sampleData[0].code} onCopy={() => setOpen(true)}>
        <motion.div
          whileHover={{ x: [0, -10, 10, 0] }}
          className={`md:bg-gray-600 rounded-full shadow flex flex-row items-center px-1 my-px cursor-pointer`}
        >
          {sampleData[0].discountType === "PERCENT" && (
            <span className="text-green-500">-{sampleData[0].amount}%</span>
          )}
          &nbsp;
          <span className={`hidden md:flex`}>{t("avec-code")}</span>
          &nbsp;
          <span className={`bg-green-500 rounded-full px-1 my-1`}>
            <span>{sampleData[0].code}</span>
          </span>
        </motion.div>
      </CopyToClipboard>
    </>
  );
};

export default CouponsNav;
