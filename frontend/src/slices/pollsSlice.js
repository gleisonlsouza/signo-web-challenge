import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pollsService from "../services/pollsService";

const initialState = {
  polls: {},
  poll: {},
  userPolls: {},
  progressPolls: {},
  futurePolls: {},
  endedPolls: {},
  insertedQuestion: {},
  error: null,
  success: false,
  loading: false,
  message: null,
  deletedId: null,
};

export const getAllPolls = createAsyncThunk(
  "polls/listpolls",
  async (_, thunkAPI) => {
    // const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.getAllPolls();
    return data;
  }
);

export const getProgressPolls = createAsyncThunk(
  "polls/listprogresspolls",
  async (_, thunkAPI) => {
    // const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.getProgressPolls();
    return data;
  }
);

export const getFuturePolls = createAsyncThunk(
  "polls/listfuturepolls",
  async (_, thunkAPI) => {
    // const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.getFuturePolls();
    return data;
  }
);

export const getEndedPolls = createAsyncThunk(
  "polls/listendedpolls",
  async (_, thunkAPI) => {
    // const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.getEndedPolls();
    return data;
  }
);

export const createPoll = createAsyncThunk(
  "polls/createpoll",
  async (newPoll, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.createPoll(newPoll, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserPolls = createAsyncThunk(
  "polls/listuserpolls",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.getUserPolls(token);
    return data;
  }
);

export const deletePoll = createAsyncThunk(
  "polls/deletepoll",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.deletePoll(id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getPollById = createAsyncThunk(
  "polls/getpollbyid",
  async (id, thunkAPI) => {
    // const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.getPollById(id);
    return data;
  }
);

export const updateQuestion = createAsyncThunk(
  "polls/updatequestion",
  async (question, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.updateQuestion(
      question.pollId,
      question.questionId,
      question.data,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const deleteQuestion = createAsyncThunk(
  "polls/deletequestion",
  async (question, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.deleteQuestion(
      question.pollId,
      question.questionId,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const insertQuestion = createAsyncThunk(
  "polls/insertquestion",
  async (question, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.insertQuestion(
      question.pollId,
      question.data,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const updatePoll = createAsyncThunk(
  "polls/updatepoll",
  async (updatedPoll, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.updatePoll(
      updatedPoll.pollId,
      updatedPoll.data,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const votePoll = createAsyncThunk(
  "polls/votepoll",
  async (votePoll, thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;

    const data = await pollsService.votePoll(
      votePoll.pollId,
      votePoll.questionId
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
      state.error = null;
      state.deletedId = null;
      state.insertedQuestion = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.polls = action.payload;
      })
      .addCase(getProgressPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.progressPolls = action.payload;
      })
      .addCase(getFuturePolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFuturePolls.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.futurePolls = action.payload;
      })
      .addCase(getEndedPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEndedPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.endedPolls = action.payload;
      })
      .addCase(createPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoll.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Enquete criada com sucesso!";
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getUserPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userPolls = action.payload;
      })
      .addCase(deletePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePoll.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Enquete deletada com sucesso!";
      })
      .addCase(deletePoll.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getPollById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPollById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.polls = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Opção atualizada com sucesso!";
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Opção excluída com sucesso!";
        state.deletedId = action.payload.question[0].id;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(insertQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Opção inserida com sucesso!";
        state.insertedQuestion = action.payload.newQuestion;
      })
      .addCase(insertQuestion.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(updatePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePoll.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Enquete atualizada com sucesso!";
        state.polls = action.payload;
      })
      .addCase(updatePoll.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(votePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Voto computado com sucesso!";
        state.polls = action.payload;
      })
      .addCase(votePoll.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export const { reset } = pollsSlice.actions;
export default pollsSlice.reducer;
