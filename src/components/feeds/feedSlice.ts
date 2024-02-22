import { createSlice } from "@reduxjs/toolkit"
import { sampleData } from "../../app/api/sampleData"
import { AppFeed } from "../../app/types/feeds"

type State ={
  posts : AppFeed[]
}

const initialState: State={
  posts:sampleData
}

export const feedSlice =createSlice({
  name:'posts',
  initialState,
  reducers:{
    createPost:(state,action) =>{
      state.posts.push(action.payload)
    }
    
  }
})


export const{createPost} = feedSlice.actions