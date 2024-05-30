export default function List({ friend, selected, onSelected }) {
  let message, className;
  const isSelected = friend?.id === selected;
  if (friend.balance === 0) {
    message = `You and ${friend.name} are even`;
    className = "";
  }
  if (friend.balance < 0) {
    message = `You owe ${friend.name} ${Math.abs(friend.balance)}€`;
    className = "red";
  }
  if (friend.balance > 0) {
    message = `${friend.name} owes you ${friend.balance}€`;
    className = "green";
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={className}>{message}</p>
      <button
        className="button"
        onClick={() => {
          onSelected(friend.id);
        }}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
