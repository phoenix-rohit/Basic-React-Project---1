import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form() {
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
    console.log(newItem);

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

function PackingList() {
  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {initialItems.map((item, idx, arr) => {
          return <Item itemInfo={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

function Item({ itemInfo }) {
  // FIXME Add toggle

  return (
    <li>
      <button>{/* <input type="checkbox" /> */}</button>
      <span style={itemInfo.packed ? { textDecoration: "line-through" } : {}}>
        {itemInfo.quantity} {itemInfo.description}
      </span>
      <button>❌</button>
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
