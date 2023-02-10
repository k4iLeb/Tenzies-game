import "../App.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#6be494" : "#ffffff",
  };

  return (
    <div onClick={props.holdDice} style={styles} className="die">
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
