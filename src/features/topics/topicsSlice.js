import { createSlice } from "@reduxjs/toolkit";
import { addQuiz } from '../quizzes/quizzesSlice';


const initialState = {
  topics: {
    // topic objects keyed by id will go here
  }
};


const topicsSlice = createSlice({
  name: 'topics',
  initialState: initialState,
  reducers: {
    addTopic: (state, action) => {
      // action.payload should have id, name, icon
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: []
      };
    },
    extraReducers: (builder) => {
      builder
      .addCase(addQuiz, (state, action) => {
       const {id, name, topicId, cardIds} = action.payload;
       state.topics[topicId].quizIds.push(id); 
      })// here we use the payload of addQuiz from quizzesSlice
    }
  }
});

export const {addTopic} = topicsSlice.actions; // action creator

export const nestedTopics = (state) => state.topics.topics; //state ,from global

export default topicsSlice.reducer; //reducer



//Inside reducers → state = only that slice’s state
//You cannot access global state directly there
//Global state is accessed via selectors, not inside reducers.

/* extraReducers are not just for async actions.

extraReducers allow a slice to respond to actions from other slices or to actions created outside the reducers field. This includes both synchronous and asynchronous actions.

Think of extraReducers as a way for your slice to “listen” for any action in your app, not just its own. It’s not like useEffect (which reacts to changes in React state or props), but it does let your slice react to actions dispatched elsewhere.

THE ABVE ADDQUIZ BELONGS TO THE QUIZZESSLICE WE CAN SE IT TO UPDATE THE QUIZ IDS
Yes, that’s correct! The `addQuiz` action is defined in the `quizzesSlice`, and you import it into your `topicsSlice` file to use in `extraReducers`. This allows your topics slice to respond whenever a quiz is added, even though the action comes from another slice.



Great question! The reason for handling `addQuiz` in the `topicsSlice` is to **keep the relationship between topics and quizzes up to date**.

Here’s what’s happening:
- When a new quiz is created, it belongs to a specific topic (using `topicId`).
- Each topic keeps track of which quizzes belong to it using a `quizIds` array.
- When you dispatch `addQuiz`, you want to add the new quiz’s ID to the correct topic’s `quizIds` array.

By using `extraReducers` in `topicsSlice`, you listen for the `addQuiz` action (even though it’s defined in `quizzesSlice`). When that action happens, you update the topic’s `quizIds` array to include the new quiz’s ID.

This keeps your state consistent:  
- The quiz knows which topic it belongs to (`topicId`).
- The topic knows which quizzes belong to it (`quizIds`).

This pattern is common in Redux when you have related data in different slices.
*/