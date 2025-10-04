import { createSlice } from '@reduxjs/toolkit';
const cobuddy = '/assets/cobuddy.png';
const prep = '/assets/prepiq.png';
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    contact: {
      l1: 'If you want to discuss more in detail, please contact me.',
      l2: 'karthigaiselvi646@gmail.com',
      l3: '9025555726',
    },
    projects: [
      {
        name: 'Co-Buddy',
        image: cobuddy,
        desc: 'Developed an AI-powered quiz platform using MERN stack and Gemini API that dynamically generates topic-based quizzes.',
        link: 'https://github.com/karthiga-ravi/co-buddy.git',
      },
      {
        name: 'PrepIQ',
        image: prep,
        desc: 'Created an AI-powered interview preparation tool using MERN stack and Gemini API that generates personalized questions from resumes. Integrated voice analysis confidence detection.',
        link: 'https://github.com/nirutthyu/prepIQ.git',
      },
    ],
  },
  reducers: {
    updateEmail: (state, action) => {
      state.contact.l2 = action.payload; // Update email dynamically
    },
    updatePhone: (state, action) => {
      state.contact.l3 = action.payload;
    },
  },
});

export const { updateEmail, updatePhone } = portfolioSlice.actions;
export default portfolioSlice.reducer;
