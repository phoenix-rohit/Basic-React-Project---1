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
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {initialItems.map((item, idx, arr) => {
          return <Item itemInfo={item} />;
        })}
      </ul>
    </div>
  );
}

function Item({ itemInfo }) {
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
