

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
    }
  }
});

export const {addTopic} = topicsSlice.actions; // action creator

export const nestedTopics = (state) => state.topics.topics; //state ,from global

export default topicsSlice.reducer; //reducer



//Inside reducers → state = only that slice’s state
//You cannot access global state directly there
//Global state is accessed via selectors, not inside reducers.
