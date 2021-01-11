import { Action } from 'redux';
import { UserEvent } from '../../interfaces';
import { RootState } from '../store';

//ACTIONS NAMES
export const LOAD_REQUEST =  'userEvents/load_request';
export const LOAD_SUCCESS = 'userEvents/load_success';
export const LOAD_FAILURE = 'userEvents/load_failure';
export const CREATE_REQUEST = 'userEvents/create_request';
export const CREATE_SUCCESS = 'userEvents/create_success';
export const CREATE_FAILURE = 'userEvents/create_failure';
export const DELETE_REQUEST = 'userEvents/delete_request';
export const DELETE_SUCCESS = 'userEvents/delete_success';
export const DELETE_FAILURE = 'userEvents/delete_failure';
export const UPDATE_REQUEST = 'userEvents/update_request';
export const UPDATE_SUCCESS = 'userEvents/update_success';
export const UPDATE_FAILURE = 'userEvents/update_failure';

//ACTIONS TYPES
export interface CreateRequestActionType extends Action<typeof CREATE_REQUEST> { }
export interface CreateFailureActionType extends Action<typeof CREATE_FAILURE> { }
export interface CreateSuccessActionType extends Action<typeof CREATE_SUCCESS> {
    payload: {
        event: UserEvent;
    }
}

export interface LoadRequestActionType extends Action<typeof LOAD_REQUEST> { }
export interface LoadSuccessActionType extends Action<typeof LOAD_SUCCESS> {
    payload: {
        events: UserEvent[];
    }
}
export interface LoadFailureActionType extends Action<typeof LOAD_FAILURE> {
    error: string
}

export interface UpdateRequestActionType extends Action<typeof UPDATE_REQUEST> { }
export interface UpdateSuccessActionType extends Action<typeof UPDATE_SUCCESS> {
    payload: {
        event: UserEvent
    }
}
export interface UpdateFailureActionType extends Action<typeof UPDATE_FAILURE> { }

export interface DeleteFailureActionType extends Action<typeof DELETE_FAILURE> { }
export interface DeleteSuccessActionType extends Action<typeof DELETE_SUCCESS> {
    payload: {
        id: UserEvent['id']
    }
}
export interface DeleteRequestActionType extends Action<typeof DELETE_REQUEST> { }

//CREATORS OF ACTIONS
export const createRequestAction = (): CreateRequestActionType => ({
    type: CREATE_REQUEST
});
export const createSuccessAction = (event: UserEvent): CreateSuccessActionType => ({
    type: CREATE_SUCCESS,
    payload: { event }
});
export const createFailureAction = (): CreateFailureActionType => ({
    type: CREATE_FAILURE
});

export const loadRequestAction = (): LoadRequestActionType => ({
    type: LOAD_REQUEST
});
export const loadSuccessAction = (events: UserEvent[]): LoadSuccessActionType => ({
    type: LOAD_SUCCESS,
    payload: { events }
});
export const loadFailureAction = (): LoadFailureActionType => ({
    type: LOAD_FAILURE,
    error: 'Failed to load events.'
});

export const updateRequestAction = (): UpdateRequestActionType => ({
    type: UPDATE_REQUEST
});
export const updateSuccessAction = (event: UserEvent): UpdateSuccessActionType => ({
    type: UPDATE_SUCCESS,
    payload: { event }
});
export const updateFailureAction = (): UpdateFailureActionType => ({
    type: UPDATE_FAILURE
});

export const deleteRequestAction = (): DeleteRequestActionType => ({
    type: DELETE_REQUEST
});
export const deleteSuccessAction = (id: UserEvent['id']): DeleteSuccessActionType => ({
    type: DELETE_SUCCESS,
    payload: { id }
});
export const deleteFailedAction = (): DeleteFailureActionType => ({
    type: DELETE_FAILURE
});

//SELECTORS
export const selectUserEventsState = (rootState: RootState) => rootState.userEvent;
export const selectUserEventsArray = (rootState: RootState) => {
    const state = selectUserEventsState(rootState);
    return state.allIds.map(id => state.byIds[id]);
}