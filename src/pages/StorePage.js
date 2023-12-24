import { useState, useEffect } from "react";

function StorePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3003/get-store-items`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setItems(records);
      console.log(items);
    }

    getRecords();

    return;
  }, [items.length]);

  const inventory = items.map((item) => {
    return <h1 key={item._id}>{item.title}</h1>;
  });

  return (
    <div className="storePage-container">
      <div>{inventory}</div>
    </div>
  );
}

export default StorePage;
