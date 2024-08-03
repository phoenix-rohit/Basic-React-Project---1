export default function Stats({ items }) {
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
