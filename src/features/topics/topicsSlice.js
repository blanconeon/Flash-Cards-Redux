import { createSlice } from "@reduxjs/toolkit";


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
    addQuizId: (state, action) => {
      const {id, topicId} = action.payload;

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

Think of extraReducers as a way for your slice to “listen” for any action in your app, not just its own. It’s not like useEffect (which reacts to changes in React state or props), but it does let your slice react to actions dispatched elsewhere.*/