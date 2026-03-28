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
*/