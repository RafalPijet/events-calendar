import { Action } from "redux";
import { RootState } from '../store';

//ACTIONS NAMES
export const START = 'recorder/start';
export const STOP = 'recorder/stop';

//ACTIONS TYPES
export type StartAction = Action<typeof START>
export type StopAction = Action<typeof STOP>

//CREATORS OF ACTIONS
export const start = (): StartAction => ({
    type: START,
})

export const stop = (): StopAction => ({
    type: STOP,
})

//SELECTORS
export const selectRecorderState = (rootState: RootState) => rootState.recorder;
export const selectDateStart = (rootState: RootState) => selectRecorderState(rootState).dateStart;
