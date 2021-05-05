import parse from "html-react-parser";
import { uniqueId } from "lodash";
const ContentParser = ({ data }) => {
  const parsed = parse(data).map((props) => <Parser {...props} />);

  return parsed;
};

export default ContentParser;

const Parser = ({ props }) => {
  if (!props) {
    return null;
  }
  const { children, className } = props;
  if (!children || !className) {
    return null;
  }
  if (className.includes("vc_row") || className.includes("wpb_row")) {
    console.log({ props });
    return <MainItem {...props} />;
  }
  if (
    className.includes("wpb_column") ||
    className.includes("vc_column_container")
  ) {
    return <Column {...props} />;
  }
  console.log({ children });

  return children;
  if (!props) {
    return null;
  }

  // console.log({ props, children, className });
};

const MainItem = ({ children, className }) => {
  // console.log({ children });
  return (
    <div className="container flex flex-row flex-wrap items-center max-w-screen-xl mx-auto">
      {!children?.props ? (
        children.map(({ props, key }) => {
          console.log({ props });
          return <Parser props={{ ...props }} key={uniqueId(key)} />;
        })
      ) : (
        <Parser props={{ ...children.props }} key={uniqueId()} />
      )}
    </div>
  );
};
const Column = (props) => {
  const { children, className } = props;
  return (
    <div
      className={`
      ${className.includes("vc_col-sm-3") ? "w-1/4" : ""}
      ${className.includes("vc_col-sm-4") ? "w-1/3" : ""}
      ${className.includes("vc_col-sm-6") ? "w-1/2" : ""}
      ${className.includes("vc_col-sm-8") ? "w-8/12" : ""}
      ${className.includes("vc_col-sm-9") ? "w-3/4" : ""}
      ${className.includes("vc_col-sm-12") ? "w-full" : ""}
  `}
    >
      {!children?.props ? (
        children.map(({ props, key }) => {
          return <Parser props={props} key={uniqueId(key)} />;
        })
      ) : (
        <Parser props={{ ...children.props }} key={uniqueId()} />
      )}
    </div>
  );
};

const VcRow = ({ children }) => {
  return <div className="">{children} </div>;
};
const VcColumnsContainer = ({ children }) => {
  return <div className="">{children} </div>;
};
//modele a copier coller
const Sample = ({ parsed }) => {
  return <div className="">{children} </div>;
};
