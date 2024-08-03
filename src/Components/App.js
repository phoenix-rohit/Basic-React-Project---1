import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  // Here is the lifted state
  const [items, setItems] = useState([]);

  function handleItems(item) {
    // here we didnt push the element because in react we cant mutate state or props therefore we created a new array and added the new element at the end
    setItems((items) => [...items, item]);
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure want to delete this list?");

    if (confirmed) setItems([]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      {/* here we passed the function we is responsible to update the state via props because Form Component is responsible for creating new item */}
      <Form onAddingItems={handleItems} />
      {/* PackingList component needed item data so that it can render the list. This is the main reason we Lifted the state  */}
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
