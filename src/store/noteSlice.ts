import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Note, Tag } from '../types/types';

interface NotesState {
  notes: Note[];
  tags: Tag[];
}

const initialState: NotesState = {
  notes: [],
  tags: []
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push({
        id: action.payload.id,
        markdown: action.payload.markdown,
        title: action.payload.title,
        tags: action.payload.tags
      });

      action.payload.tags.forEach((tag) => {
        if (
          !state.tags.some((existingTag) => existingTag.label === tag.label)
        ) {
          state.tags.push(tag);
        }
      });
    },

    updateNote(state, action: PayloadAction<Note>) {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );
    },

    removeNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    }
  }
});

export const { addNote, removeNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
