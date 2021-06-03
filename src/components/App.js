import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  const BASE_URL = `http://localhost:3001`;
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  useEffect(() => {
    fetch(`${BASE_URL}/toys`)
      .then((r) => r.json())
      .then((json) => setToys(json));
  }, []);
  function handleNewToy(formData) {
    fetch(`${BASE_URL}/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        setToys(() => [...toys, data]);
      })
      .then(setShowForm((showForm) => !showForm));
  }
  function handleToyLikes(id) {
    const updatingToy = toys.filter((toy) => toy.id === id)[0];

    fetch(`${BASE_URL}/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatingToy.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((data) =>
        setToys(() => {
          return toys.map((toy) => {
            if (toy.id !== id) return toy;
            return data;
          });
        })
      );
  }
  function handleDonatingToy(id) {
    fetch(`${BASE_URL}/toys/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() =>
        setToys(() => {
          return toys.filter((toy) => toy.id !== id);
        })
      );
  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm submitNewToy={handleNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        likeToy={handleToyLikes}
        donateToy={handleDonatingToy}
      />
    </>
  );
}

export default App;
