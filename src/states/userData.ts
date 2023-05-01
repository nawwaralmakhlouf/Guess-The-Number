import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from './store';

// declaring the types for our state
export type userData = {
    accepted: boolean;
    can_start_round: boolean;
    round_started: boolean;
    round_finished: boolean;
    name: string;
    final_score: string;
    speed: number;
    points: number;
    multiplier: number;
    players: any;
    gues_value: number;
};

const initialState: userData = {
    accepted: false,
    can_start_round: false,
    round_started: false,
    round_finished: false,
    name: "",
    final_score: "-",
    points: 0,
    multiplier: 0,
    players: [],
    gues_value: 0,
    speed: 0
};

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAccepted: (state, action: PayloadAction<boolean>) => {
            state.accepted = true;
        },
        setSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
        },
        setPoints: (state, action: PayloadAction<number>) => {
            state.points = action.payload;
            state.can_start_round = (state.multiplier > 0 && state.points > 0) ? true : false;
        },
        setMultiplier: (state, action: PayloadAction<number>) => {
            state.multiplier = action.payload;
            state.can_start_round = (state.multiplier > 0 && state.points > 0) ? true : false;
        },
        setRoundStarted: (state, action: PayloadAction<boolean>) => {
            state.round_started = action.payload;
            state.round_finished = false;
        },
        setPlayers: (state, action: PayloadAction<any>) => {
            state.players = action.payload;
        },
        setGuesValue: (state, action: PayloadAction<number>) => {
            state.gues_value = action.payload;
        },
        setRoundFinished: (state, action: PayloadAction<boolean>) => {
            state.round_finished = action.payload;
        },
        setScore: (state, action: PayloadAction<string>) => {
            state.final_score = action.payload;
        }
    },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setName,
    setSpeed,
    setMultiplier,
    setPoints,
    setRoundStarted,
    setPlayers,
    setScore,
    setGuesValue,
    setAccepted,
    setRoundFinished,
} = userDataSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const userDataSelector = (state: RootState) => state.userData;

// exporting the reducer here, as we need to add this to the store
export default userDataSlice.reducer;