import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  className: 'primaryColor',
  text: 'Start typing',
  file: null,
  editText: false,
  editPhotoOrVideo: false,
  filePreview: '',
  stories: [],
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setAllStories: (state, action) => {
      state.stories = action.payload.stories
    },
    setClassName: (state, action) => {
      state.className = action.payload.className;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    updateStory: (state, action) => {
      state.stories.unshift(action.payload.story)
    },
    setEditText: (state, action) => {
      if (state.editPhotoOrVideo) {
        state.editText = false;
      } else {
        state.editText = !state.editText;
      }
    },
    getFile: (state, action) => {
      state.file = action.payload.file
    },
    setEditPhotoOrVideo: (state, action) => {
      if (state.editText) {
        state.editPhotoOrVideo = false;
      } else {
        state.editPhotoOrVideo = !state.editPhotoOrVideo;
      }
    },
    setFilepPreview: (state, action) => {
      state.filePreview = action.payload.preview;
    },
    resetStory: (state) => {
      state.stories = []
    },
  },
});

export const { setClassName, setText, setEditText, setEditPhotoOrVideo, setFilepPreview, getFile,setAllStories, resetStory, updateStory } = storySlice.actions;
export default storySlice.reducer;
