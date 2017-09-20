import {combineReducers} from 'redux';
import {ThreadsReducer} from './chat/shared/threads/threads.reducer';
import {UsersReducer} from './chat/shared/users/users.reducer';

const rootReducer = combineReducers({
    users: UsersReducer,
    threads: ThreadsReducer
});

export default rootReducer;