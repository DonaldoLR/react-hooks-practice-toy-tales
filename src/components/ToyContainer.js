import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, donateToy, likeToy }) {
  const displayToyComponents = toys.map((toy) => (
    <ToyCard key={toy.id} toy={toy} donateToy={donateToy} likeToy={likeToy} />
  ));

  return <div id="toy-collection">{displayToyComponents}</div>;
}

export default ToyContainer;
