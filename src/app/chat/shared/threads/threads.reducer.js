import {
    ADD_THREAD,
    SELECT_THREAD,
    ADD_MESSAGE,
    GET_MESSAGES_REQUEST,
    POST_MESSAGE_REQUEST
} from './threads.actions';

const INITIAL_STATE = {
    isFetching: false,
    isPosting: false,
    ids: [],
    currentThreadId: null,
    entities: {}
};

export const ThreadsReducer =
    function (state = INITIAL_STATE, { meta, payload, type }) {
        switch (type) {
            case ADD_THREAD: {
                const thread = payload.thread;

                if (state.ids.includes(thread.id)) {
                    return state;
                }

                return {
                    ids: [...state.ids, thread.id],
                    currentThreadId: state.currentThreadId,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: thread
                    })
                };
            }

            case ADD_MESSAGE: {
                const thread = payload.thread;
                const newMessage = payload.message;

                const oldThread = state.entities[thread.id];
                const newThread = Object.assign({}, oldThread, {
                    messages: [...(oldThread.messages || []), newMessage]
                });

                return {
                    isFetching: false,
                    isPosting: false,
                    ids: state.ids,
                    currentThreadId: state.currentThreadId,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: newThread
                    })
                };
            }

            case SELECT_THREAD: {
                const thread = payload.thread;
                const oldThread = state.entities[thread.id];

                const newThread = Object.assign({}, oldThread, {
                    messages: payload.messages.filter(message => message.thread.id === thread.id),
                    unreadCount: 0
                });

                return {
                    isFetching: false,
                    ids: state.ids,
                    currentThreadId: thread.id,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: newThread
                    })
                };
            }

            case GET_MESSAGES_REQUEST:
                return Object.assign({}, state, {
                    isFetching: true
                })

            case POST_MESSAGE_REQUEST:
                return Object.assign({}, state, {
                    isPosting: true
                })

            default:
                return state;
        }
    };