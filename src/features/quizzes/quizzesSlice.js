import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: {
         // quizzes objects keyed by id will go here
    }
}


const quizzesSlice = createSlice({
name: 'quizzes',
initialState: initialState,
reducers: {
    addQuiz: (state, action) => {
        const {id, name, topicId, cardIds} = action.payload;
        state.quizzes[id] = {
            id,
            name,
            topicId,
            cardIds
        }
    } 
}
});

export const allQuizzes = (state) => state.quizzes.quizzes;
//export const selectAllQuizzes = (state) => Object.values(state.quizzes.quizzes); // memoization can be added later with reselect
export const {addQuiz} = quizzesSlice.actions;

export default quizzesSlice.reducer;
