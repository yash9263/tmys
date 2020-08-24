import React, { useState, useEffect } from "react";

function List() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  async function fetchData() {
    fetch("/all") // fetch data from api
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data); // update state
          //   console.log(this.state.items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.secret}</li>
        ))}
      </ul>
    );
  }
}

export default List;
