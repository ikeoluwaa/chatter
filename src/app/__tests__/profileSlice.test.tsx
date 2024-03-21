import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { profileSlice } from "../../features/profiles/profileSlice";
import { act } from "react-dom/test-utils"; // Import act from react-dom/test-utils

test("setFollowing reducer updates following status correctly", () => {
  // Set up initial state
  const initialState = profileSlice.reducer(undefined, { type: "" });

  // Create a Redux store with the profile slice reducer
  const store = configureStore({
    reducer: { profiles: profileSlice.reducer },
    preloadedState: { profiles: initialState },
  });

  // Dispatch an action to the 'setFollowing' reducer
  const action: PayloadAction<{ id: string; isFollowing: boolean }> =
    profileSlice.actions.setFollowing({ id: "1", isFollowing: true });

  // Wrap the dispatch call inside an act() call
  act(() => {
    store.dispatch(action);
  });
});
