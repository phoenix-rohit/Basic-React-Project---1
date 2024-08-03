export default function Item({ itemInfo, onDeleteItems, onToggleItems }) {
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
