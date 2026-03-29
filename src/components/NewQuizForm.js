import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
// import selectors
import {nestedTopics} from "../features/topics/topicsSlice";
import { addQuiz } from '../features/quizzes/quizzesSlice';
import {addCard} from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(nestedTopics);  // Replace with topics 
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];
    cards.forEach(card => {
    const cardId = uuidv4();
     dispatch(addCard({ ...card, id: cardId }));
     cardIds.push(cardId);
     });
    // create the new cards here and add each card's id to cardIds
    // create the new quiz here

    const quizId = uuidv4();

    // dispatch add quiz action 

    dispatch(addQuiz({
    id: quizId,
    name: name,
    topicId: topicId,
    cardIds: cardIds 
    }))

    navigate(ROUTES.quizzesRoute())
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}

/*
The connection between the cards and the quiz is made by the `cardIds` array inside the quiz object. 

When you dispatch the action to add the quiz, you include:
- The quiz’s own `id`
- The quiz’s `name`
- The `topicId` it belongs to
- The `cardIds` array, which contains the IDs of all cards for this quiz

This `cardIds` array is what links the quiz to its cards. When you want to display the cards for a quiz, you look up each card in Redux state using the IDs in the quiz’s `cardIds` array. This is how the relationship is maintained.



That’s a great observation! Here’s how it works:

- When the user adds cards in the form, those cards are **only stored in the component’s local state** (not in Redux yet).
- The cards are **not** in the Redux store until the user submits the quiz form.
- When the user submits the form, you loop through the local `cards` array, generate IDs, and dispatch `addCard` for each one. This is when the cards are added to Redux.
- At the same time, you collect the IDs and use them to create the quiz in Redux.

So, **cards are only connected to the quiz in Redux when the form is submitted**. Before submission, everything is just in local state. This is a common pattern in React/Redux apps.*/