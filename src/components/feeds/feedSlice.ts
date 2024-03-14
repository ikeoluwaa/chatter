import { PayloadAction } from "@reduxjs/toolkit";
import { AppFeed } from "../../app/types/feeds";
import { Timestamp } from "firebase/firestore";
import {
  GenericActions,
  GenericState,
  createGenericSlice,
} from "../../app/store/genericSlice";
import { auth } from "../../app/config/firebase";

type State = {
  data: AppFeed[];
  loadedInitial: boolean;
};

const initialState: State = {
  data: [],
  loadedInitial: false,
};

export const feedSlice = createGenericSlice({
  name: "posts",
  initialState: initialState as GenericState<AppFeed[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppFeed[]>) => {
        state.data = removeDuplicates([...action.payload, ...state.data]);
        state.status = "finished";
        state.loadedInitial = true;
      },
      prepare: (posts: any) => {
        let postArray: AppFeed[] = [];
        Array.isArray(posts) ? (postArray = posts) : postArray.push(posts);
        const mapped = postArray.map((e: any) => {
          const date =
            e.date instanceof Timestamp
              ? e.date.toDate().toISOString()
              : e.date;
          return {
            ...e,
            date,
            isAuthor: auth.currentUser?.uid === e.authorUid,
          };
        });
        return { payload: mapped };
      },
    },
  },
});

export const actions = feedSlice.actions as GenericActions<AppFeed[]>;

function removeDuplicates(posts: AppFeed[]) {
  return Array.from(new Set(posts.map((x) => x.id)))
    .map((id) => posts.find((a) => a.id === id) as AppFeed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
