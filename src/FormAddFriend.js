import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function FormAddFriend({ setIsAdd, setFriends }) {
  // initial state to store new friend name
  const [friendName, setFriendName] = useState("");
  // initial state to store new friend image
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");
  function addFriend(newFriend) {
    setFriends((oldFriends) => [...oldFriends, newFriend]);
  }
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
  return (
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
  );
}
