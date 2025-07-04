import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginStatusProps, Userprops } from "../../modal/modal";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../Firebase/config";

// Initial state
const initialState: LoginStatusProps = {
    userDetails:{
    name: "",
    email: "",
    img: "",
  },
  statusIn: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  statusOut:'idle',
  error: null,
};

// Async thunk for Google Sign-In
export const googleSignIn = createAsyncThunk<Userprops, void, { rejectValue: string }>(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = response.user;

      // Return the user details in the shape that matches Userprops
      return {
        name: displayName,
        email: email,
        img: photoURL,
      };
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message); // Return the error message on failure
    }
  }
);

export const googleSignOut = createAsyncThunk<null, void, {rejectValue : string}>(
    "auth/googleSignOut",
    async (_, { rejectWithValue }) => {
      try {
        await signOut(auth);
        return null; // Indicating the user is logged out
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

// Authentication slice
const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // signin
      .addCase(googleSignIn.pending, (state) => {
        state.statusIn = "loading";
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action: PayloadAction<Userprops>) => {
        state.statusIn = "succeeded";
        state.userDetails = { ...state.userDetails, ...action.payload }; // Merge userDetails
      })
      .addCase(googleSignIn.rejected, (state, action:PayloadAction<string | undefined>) => {
        state.statusIn = "failed";
        state.error = action.payload || "An error occurred."; // Handle any errors
      })
    //   signout
    .addCase(googleSignOut.pending, (state) =>{
        state.statusOut = 'loading'
    })
    .addCase(googleSignOut.fulfilled, (state) =>{
        state.statusOut = 'succeeded',
        state.error = null
        state.userDetails = {name:'', email:'', img:''} 
    })
    .addCase(googleSignOut.rejected, (state, action:PayloadAction<string | undefined>) => {
        state.statusOut = "failed";
        state.error = action.payload || "An error occurred."; // Handle any errors
    })

  },
});

// Export reducer
export default AuthSlice.reducer;
