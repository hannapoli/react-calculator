import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <div className="screen">
      <p className="input">{value}</p>
    </div>
  );
};

export default Screen;
