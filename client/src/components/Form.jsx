import React, { useState } from "react";

function FormList(props) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error: ", error);
      });
    window.location.reload(false);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
      <p>Here goes the output: {value}</p>
    </form>
  );
}

export default FormList;
