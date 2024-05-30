import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import List from "./List";
import Select from "./Select";

export default function App() {
  const [isAdd, setIsAdd] = useState(false);
  // initial state friends for CRUD
  const [friends, setFriends] = useState([]);
  // initial state selectedFriendId for check the selected data
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  // initial state to store new friend name
  const [friendName, setFriendName] = useState("");
  // initial state to store new friend image
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");

  const friendBill1 = bill ? bill - myExpense : "";
  const [split, setSplit] = useState("user");
  // if previous id is same with the current id, set to not selected else set to selected
  function handleSelected(curId) {
    setSelectedFriendId((prevId) => (prevId === curId ? null : curId));
    setIsAdd(false);
  }

  // Setup a object for selected by user and able to get data from the selected object
  const [curFriend] = friends.filter(
    (friend) => friend.id === selectedFriendId
  );

  // Handle Submit action
  function handleAddFriend(e) {
    e.preventDefault();
    if (!friendName || !friendImage) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: friendName,
      image: `${friendImage}?=${id}`,
      balance: 0,
    };
    addFriend(newFriend);
    setIsAdd(false);
  }

  function toggleAdd() {
    setIsAdd(!isAdd);
  }

  function addFriend(newFriend) {
    setFriends((oldFriends) => [...oldFriends, newFriend]);
  }

  function handleSplit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    onSplit(split === "user" ? friendBill1 : -myExpense);
    setBill("");
    setMyExpense("");
    setSelectedFriendId("");
  }

  function onSplit(value) {
    setFriends((oldFriends) =>
      oldFriends.map((friend) =>
        friend.id === curFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  // function handleRemoveFriend() {
  //   if (!curFriend) {
  //     return;
  //   }
  //   setFriends((oldFriends) =>
  //     oldFriends.map((friend) => friend.id !== curFriend.id)
  //   );
  // }

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <List
              friend={friend}
              key={friend.id}
              selected={selectedFriendId}
              onSelected={handleSelected}
            />
          ))}
        </ul>
        {isAdd ? (
          <form className="form-add-friend" onSubmit={handleAddFriend}>
            <Input
              type="text"
              inputValue={friendName}
              onAction={(e) => setFriendName(e.target.value)}>
              👭 Friend name
            </Input>
            <Input
              type="text"
              inputValue={friendImage}
              onAction={(e) => setFriendImage(e.target.value)}>
              🌄 Image URL
            </Input>
            <Button onClick={handleAddFriend}>Add</Button>
          </form>
        ) : (
          ""
        )}
        <Button onClick={toggleAdd}>{isAdd ? `Close` : `Add friend`}</Button>
        {/* <Button onClick={handleRemoveFriend}>Remove Friend</Button> */}
      </div>

      {selectedFriendId ? (
        <form className="form-split-bill" onSubmit={handleSplit}>
          <h2>split a bill with</h2>
          <Input
            type="number"
            inputValue={bill}
            onAction={(e) => setBill(Number(e.target.value))}>
            💰 Bill value
          </Input>
          <Input
            type="number"
            inputValue={myExpense}
            onAction={(e) =>
              setMyExpense(
                Number(e.target.value) > bill
                  ? myExpense
                  : Number(e.target.value)
              )
            }>
            🧍‍♀️ Your expense
          </Input>
          <Input type="number" unable={true} inputValue={friendBill1}>
            👭 {curFriend.name}'s expense:
          </Input>
          <Select friend={curFriend} split={split} onSplit={setSplit}>
            🤑 Who is paying the bill?
          </Select>
          <Button>Split bill</Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
