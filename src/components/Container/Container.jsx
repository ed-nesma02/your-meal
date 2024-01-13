import PropTypes from "prop-types";
import s from "./Container.module.css";
import cn from "classnames";

export const Container = ({ className, children }) => {
  return <div className={cn(s.container, className)}>{children}</div>;
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
