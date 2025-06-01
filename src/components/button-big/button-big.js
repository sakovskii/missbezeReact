import "./button-big.scss";

const ButtonBig = ({ btnText, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {btnText}
    </button>
  );
};

export default ButtonBig;
