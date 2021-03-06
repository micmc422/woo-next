import Nav from "./Nav";
import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Header = ({ menu, translations, coupons }) => {
  const ref = useRef();
  let [check, setCheck] = useState(true);
  const sticky = useStickyHeader(200);
  const headerClasses = `relative header z-50 ${
    sticky && check ? "sticky top-0" : ""
  }`;
  const { clientHeight } = ref;

  const checkChange = (value) => {
    setCheck(value);
  };

  return (
    <motion.div
      className={`${headerClasses}`}
      animate={sticky ? { y: ["-100%", "0%"] } : { y: ["0%", "0%"] }}
      ref={ref}
    >
      <Nav menu={menu} translations={translations} sticky={sticky}  coupons={coupons}/>
    </motion.div>
  );
};

function useStickyHeader(offset = 0) {
  const [stick, setStick] = useState(false);

  const handleScroll = () => {
    setStick(window.scrollY > offset);
  };

  useEffect(() => {
    window && window.addEventListener("scroll", handleScroll);

    return () => {
      window && window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return stick;
}

export default Header;
