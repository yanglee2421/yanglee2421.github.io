// Redux Toolkit Imports
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Localforage Imports
import localforage from "localforage";

export const loadBgImg = createAsyncThunk("loadBgImg", async () => {
  try {
    const dataURL = await localforage.getItem("bg-img");
    if (typeof dataURL === "string") {
      return dataURL;
    }
  } catch (error) {
    console.error(error);
  }
  return "";
});

export const setBgImg = createAsyncThunk<string, string>(
  "setBgImg",
  async (params) => {
    try {
      const dataURL = await localforage.setItem("bg-img", params);
      return dataURL;
    } catch (error) {
      console.error(error);
    }

    return "";
  }
);

export const sliceTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    isDark(state, { payload }: PayloadAction<boolean>) {
      state.isDark = payload;
    },
    isDarkToggle(state, { payload }: PayloadAction<boolean | void>) {
      switch (payload) {
        case true:
        case false:
          state.isDark = payload;
          break;
        default:
          state.isDark = !state.isDark;
      }
    },
  },
  extraReducers(builder) {
    // ** LoadBgImg
    builder.addCase(loadBgImg.pending, (s) => {
      s.isLoading = true;
      s.bgImg = "";
    });
    builder.addCase(loadBgImg.fulfilled, (s, ctx) => {
      s.isLoading = false;
      s.bgImg = ctx.payload;
    });
    builder.addCase(loadBgImg.rejected, (s) => {
      s.isLoading = false;
      s.bgImg = "";
    });

    // ** SetBgImg
    builder.addCase(setBgImg.pending, (s) => {
      s.isLoading = true;
    });
    builder.addCase(setBgImg.fulfilled, (s, ctx) => {
      s.isLoading = false;
      s.bgImg = ctx.payload;
    });
    builder.addCase(setBgImg.rejected, (s) => {
      s.isLoading = false;
    });
  },
});

function initialState() {
  return {
    isDark: false,
    isLoading: false,
    bgImg: "",
  };
}
