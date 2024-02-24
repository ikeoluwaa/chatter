import { PayloadAction } from "@reduxjs/toolkit";
import { AppFeed } from "../../app/types/feeds";
import { Timestamp } from "firebase/firestore";
import {
  GenericActions,
  GenericState,
  createGenericSlice,
} from "../../app/store/genericSlice";

type State = {
  data: AppFeed[];
};

const initialState: State = {
  data: [],
};

export const feedSlice = createGenericSlice({
  name: "posts",
  initialState: initialState as GenericState<AppFeed[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppFeed[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      prepare: (posts: any) => {
        let postArray: AppFeed[] = [];
        Array.isArray(posts) ? (postArray = posts) : postArray.push(posts);
        const mapped = postArray.map((e: any) => {
          // Check if e.date is a Timestamp object before calling toDate()
          const date =
            e.date instanceof Timestamp
              ? e.date.toDate().toISOString()
              : e.date;
          return { ...e, date };
        });
        return { payload: mapped };
      },
    },
  },
});

export const actions = feedSlice.actions as GenericActions<AppFeed[]>;
