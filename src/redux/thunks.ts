import { ThunkAction } from "redux-thunk";
import { UserEvent } from '../interfaces';
import { RootState } from './store';
import { selectDateStart } from './actions/recorderActions'
import {
    UpdateRequestActionType,
    UpdateSuccessActionType,
    UpdateFailureActionType,
    DeleteSuccessActionType,
    DeleteFailureActionType,
    DeleteRequestActionType,
    LoadSuccessActionType,
    LoadFailureActionType,
    LoadRequestActionType,
    CreateSuccessActionType,
    CreateFailureActionType,
    CreateRequestActionType,
    updateRequestAction,
    updateSuccessAction,
    updateFailureAction,
    deleteFailedAction,
    deleteRequestAction,
    deleteSuccessAction,
    loadFailureAction,
    loadSuccessAction,
    loadRequestAction,
    createFailureAction,
    createRequestAction,
    createSuccessAction
 } from './actions/eventsActions';

 export const createUserEvent = (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CreateRequestActionType | CreateSuccessActionType | CreateFailureActionType
> => async (dispatch, getState) => {
    dispatch(createRequestAction());

    try {
        const dateStart = selectDateStart(getState());
        const event: Omit<UserEvent, 'id'> = {
            title: 'No name',
            dateStart,
            dateEnd: new Date().toISOString()
        }
        const response = await fetch('http://localhost:3001/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });
        const createdEvent: UserEvent = await response.json();
        dispatch(createSuccessAction(createdEvent));
    } catch (err) {
        dispatch(createFailureAction());
    }
};

 export const loadUserEvents = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoadRequestActionType | LoadSuccessActionType | LoadFailureActionType
> => async (dispatch, getState) => {
    dispatch(loadRequestAction());

    try {
        const response = await fetch('http://localhost:3001/events');
        const events: UserEvent[] = await response.json();
        dispatch(loadSuccessAction(events))
    } catch (err) {
        dispatch(loadFailureAction());
    }
}

 export const deleteUserEvent = (id: UserEvent['id']): ThunkAction<
 Promise<void>,
 RootState,
 undefined,
 DeleteRequestActionType | DeleteSuccessActionType | DeleteFailureActionType
> => async (dispatch, getState) => {
 dispatch(deleteRequestAction());

 try {
     const response = await fetch(`http://localhost:3001/events/${id}`, {
         method: 'DELETE'
     })

     if (response.ok) {
         dispatch(deleteSuccessAction(id));
     }
 } catch (err) {
     dispatch(deleteFailedAction());
 }
}

export const updateUserEvent = (event: UserEvent): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UpdateRequestActionType | UpdateSuccessActionType | UpdateFailureActionType
> => async (dispatch, getState) => {
    dispatch(updateRequestAction())

    try {
        const response = await fetch(`http://localhost:3001/events/${event.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        const updatedEvent: UserEvent = await response.json();

        dispatch(updateSuccessAction(updatedEvent))
    } catch (err) {
        dispatch(updateFailureAction());
    }
}