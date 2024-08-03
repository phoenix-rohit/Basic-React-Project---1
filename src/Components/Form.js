import { useState } from "react";

export default function Form({ onAddingItems }) {
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
