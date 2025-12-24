import "./ShinyText.css";

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  style = {},
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration, ...style }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
