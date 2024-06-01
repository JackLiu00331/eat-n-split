import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export default function FormSplitBill({ curFriend, onFriend }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");

  const friendBill1 = bill ? bill - myExpense : "";
  const [split, setSplit] = useState("user");
  function handleSplit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    onSplit(split === "user" ? friendBill1 : -myExpense);
  }
  function onSplit(value) {
    onFriend((oldFriends) =>
      oldFriends.map((friend) =>
        friend.id === curFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }
  return (
    <form className="form-split-bill" onSubmit={onSplit}>
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
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }>
        🧍‍♀️ Your expense
      </Input>
      <Input type="number" unable={true} inputValue={friendBill1}>
        👭 {curFriend.name}'s expense:
      </Input>
      <Select friend={curFriend} split={split} onSplit={handleSplit}>
        🤑 Who is paying the bill?
      </Select>
      <Button>Split bill</Button>
    </form>
  );
}
