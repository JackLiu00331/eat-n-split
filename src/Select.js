export default function Select({ friend, split, onSplit, children }) {
  return (
    <>
      <label>{children}</label>
      <select value={split} onChange={(e) => onSplit(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
    </>
  );
}
