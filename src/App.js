import { useState } from "react";
import Button from "./Button";
import List from "./List";
import FormSplitBill from "./FormSplitBill";
import FormAddFriend from "./FormAddFriend";

export default function App() {
  const [isAdd, setIsAdd] = useState(false);
  // initial state friends for CRUD
  const [friends, setFriends] = useState([]);
  // initial state selectedFriendId for check the selected data
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  // if previous id is same with the current id, set to not selected else set to selected
  function handleSelected(curId) {
    setSelectedFriendId((prevId) => (prevId === curId ? null : curId));
    setIsAdd(false);
  }

  // Setup a object for selected by user and able to get data from the selected object
  const [curFriend] = friends.filter(
    (friend) => friend.id === selectedFriendId
  );

  function toggleAdd() {
    setIsAdd(!isAdd);
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
          <FormAddFriend setIsAdd={setIsAdd} setFriends={setFriends} />
        ) : (
          ""
        )}
        <Button onClick={toggleAdd}>{isAdd ? `Close` : `Add friend`}</Button>
      </div>

      {selectedFriendId ? (
        <FormSplitBill
          onFriend={setFriends}
          key={selectedFriendId}
          curFriend={curFriend}
        />
      ) : (
        ""
      )}
    </div>
  );
}
