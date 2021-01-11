import { UserEventsState } from '../../interfaces';
import {
    LOAD_SUCCESS,
    CREATE_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SUCCESS,
    LoadSuccessActionType,
    CreateSuccessActionType,
    UpdateSuccessActionType,
    DeleteSuccessActionType
} from '../actions/eventsActions';

const initialState: UserEventsState = {
    byIds: {},
    allIds: []
}

const userEventsReducer = (
    state: UserEventsState = initialState,
    action: LoadSuccessActionType | CreateSuccessActionType | DeleteSuccessActionType | UpdateSuccessActionType
) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state,
                allIds: events.map(item => item.id),
                byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    return byIds;
                }, {})
            }
        case CREATE_SUCCESS:
            const { event } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, event.id],
                byIds: { ...state.byIds, [event.id]: event }
            }
        case DELETE_SUCCESS:
            const { id } = action.payload;
            const newState = {
                ...state,
                byIds: { ...state.byIds },
                allIds: state.allIds.filter(item => item !== id)
            }
            delete newState.byIds[id];
            return newState;
        case UPDATE_SUCCESS:
            const { event: updatedEvent } = action.payload;
            return {
                ...state,
                byIds: { ...state.byIds, [updatedEvent.id]: updatedEvent }
            }
        default:
            return state;
    }
}

export default userEventsReducer;