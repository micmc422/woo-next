import NProgress from "nprogress";
import { useEffect, useState } from "react";
import Layout from "./Layout";

const Loading = () => {
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    setLoading(NProgress.status);
  }, [NProgress.status]);
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
          <div className="flex flex-col w-full pr-0 mb-6 text-center md:pr-10 md:mb-0 md:w-auto md:text-left">
            <h2 className="mb-1 text-xs font-medium tracking-widest text-indigo-500 title-font">
              Chargement en cour
            </h2>
            <h1 className="text-2xl font-medium text-gray-900 md:text-3xl title-font">
              Progession : {loading * 100} %
            </h1>
          </div>
          <div className="flex items-center flex-shrink-0 mx-auto space-x-4 md:ml-auto md:mr-0">
           
           </div>
        </div>
      </section>
    </Layout>
  );
};

export default Loading;
