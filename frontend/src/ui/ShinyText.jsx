import "./ShinyText.css";

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  style = {},
  ...props
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      {...props}
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration, ...style }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
