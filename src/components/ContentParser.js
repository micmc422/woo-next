import parse from "html-react-parser";
import { uniqueId } from "lodash";
const ContentParser = ({ data }) => {
  // console.log(data);
  const parsed = parse(data);

  return parsed.map((props) => <Parser props={props} />);
};

export default ContentParser;

const Parser = ({ props }) => {
  if (Array.isArray(props)) {
    console.log(props);
    return props.map((item) => {
      console.log(item);
      if (item.type) {
        return <Parser {...item} />;
      } else {
        return item;
      }
    });
  }
  if (!props?.props) {
    console.log("!props");
    return null;
  }
  //  console.log(props);
  const {
    props: { children, className },
    type,
  } = props;
  if (!children) {
    console.log("!children");
    return null;
  }

  if (className?.includes("vc_row") || className.includes("wpb_row")) {
    // console.log({ props });
    return <MainItem {...props} />;
  }
  if (
    className?.includes("wpb_column") ||
    className?.includes("vc_column_container")
  ) {
    return <Column {...props} />;
  }

  if (className?.includes("vc_column-inner")) {
    return <Wrapper {...props} />;
  }
  if (type === "h3") {
    // console.log("h3");
    return <TitreH {...props} />;
  }
  /*
  if (type === "div") {
    // console.log("h3");
    return <Wrapper {...props} />;
  }
  if (className?.includes("wpb_wrapper")) {
    return <Wrapper {...props} />;
  }
  if (children.type === "a") {
    return <ALink {...props} />;
  }
  if (children.type === "span") {
    return <SpanEl {...props} />;
  }
  if (!Array.isArray(children) && !children.type) {
    // console.log(children);
    return children;
  } else {
    if (children.type) {
      return <Parser {...children} />;
    }
    //  console.log(children);
    return Array.isArray(children) ? (
      children.map((child) => {
        if (child.type) {
          console.log({ child });
          return <Parser {...child} />;
        }
        return child;
      })
    ) : (
      <Parser {...children} />
    );
  }
  */
  console.log(children);
  return <Parser props={children} key={uniqueId(props.key)} />;

  // console.log({ props, children, className });
};

function InnerParser(children) {
  console.log(children);
  return Array.isArray(children) ? (
    children.map((props) => {
      //  console.log(props);
      return <Parser props={props} key={uniqueId(props.key)} />;
    })
  ) : (
    <Parser props={children} />
  );
}

const MainItem = ({ props }) => {
  const { children, className } = props;
  console.log({ props });
  return (
    <div className="container flex flex-row flex-wrap items-center max-w-screen-xl mx-auto">
      {InnerParser(children)}
    </div>
  );
};
const Column = ({ props }) => {
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
      {InnerParser(children)}
    </div>
  );
};
const Wrapper = ({ props }) => {
  const { children, className } = props;
  return <div className={`p-1`}>{InnerParser(children)}</div>;
};
const ALink = ({ props }) => {
  const { children, className } = props;
  const { href, target } = children.props;
  return <a {...{ href, target }}>{InnerParser(children)}</a>;
};
const SpanEl = ({ children, className, href, target }) => {
  return <span {...{ href, target }}>{InnerParser(children)}</span>;
};

const TitreH = ({ children, className, href, target }) => {
  return (
    <h2 className={`text-red-500`} {...{ href, target }}>
      {InnerParser(children)}
    </h2>
  );
};
