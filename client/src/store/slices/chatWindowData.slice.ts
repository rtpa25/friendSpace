import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface ChatWindowDataState {
  isOpen: boolean;
  user: User | undefined;
}

// Define the initial state using that type
const initialState: ChatWindowDataState = {
  isOpen: false,
  user: undefined,
};

export const ChatWindowDataSlice = createSlice({
  name: 'chat',

  initialState: initialState,

  reducers: {
    setChatData: (
      state: ChatWindowDataState,
      action: PayloadAction<ChatWindowDataState>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.user = action.payload.user;
    },
  },
});

export const { setChatData } = ChatWindowDataSlice.actions;

export default ChatWindowDataSlice.reducer;
