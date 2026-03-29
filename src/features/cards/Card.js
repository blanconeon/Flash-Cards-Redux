import React, { useState } from "react";
import { useSelector } from "react-redux";
// import selector
import {idSelector} from "./cardsSlice";

export default function Card({ id }) {
  const card = useSelector(idSelector(id)); // replace this with a call to your selector to get a card by id
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}

/* Normally, useSelector takes a function that receives the whole Redux state and returns the part you want.
Your selector, idSelector, is a function that returns another function. This is called a “selector factory.”
When you call idSelector(id), you get back a function that takes the state and returns the card with that id.
So, useSelector(idSelector(id)) works like this:

idSelector(id) returns a function:
(state) => state.cards.cards[id]
useSelector calls that function with the Redux state.
You get the card object for that id.
This lets you select a specific card from state using its ID.

*/


