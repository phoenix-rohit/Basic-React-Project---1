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

function PackingList({ items, onDeleteItems, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {sortedItems.map((item, idx, arr) => {
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

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start add items to your list 🚢</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.slice().filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100) || 0;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You are ready to go 🚀`
          : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
