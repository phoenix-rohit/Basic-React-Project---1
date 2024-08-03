import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  // Here is the lifted state
  const [items, setItems] = useState([]);

  function handleItems(item) {
    // here we didnt push the element because in react we cant mutate state or props therefore we created a new array and added the new element at the end
    setItems((items) => [...items, item]);
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
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddingItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // Preventing from empty descriptions
    if (!description) return;

    const newItem = {
      quantity,
      description,
      packed: false,
      id: Date.now(),
    };

    onAddingItems(newItem);

    // Setting to default values again
    setDescription("");
    setQuantity(1);
  }

  /* Array.from({ length: 20 }, (v, i, arr) => i + 1) used to create an array from recives 2 arugments 1st is an object containing length and second is map function */

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (v, i, arr) => i + 1).map(
          (num, idx, arr) => {
            return (
              <option value={num} key={num}>
                {num}
              </option>
            );
          }
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {items.map((item, idx, arr) => {
          return (
            <Item
              itemInfo={item}
              key={item.id}
              onDeleteItems={onDeleteItems}
              onToggleItems={onToggleItems}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Item({ itemInfo, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemInfo.packed}
        onChange={() => {
          onToggleItems(itemInfo.id);
        }}
      />
      <span style={itemInfo.packed ? { textDecoration: "line-through" } : {}}>
        {itemInfo.quantity} {itemInfo.description}
      </span>
      <button onClick={() => onDeleteItems(itemInfo.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
