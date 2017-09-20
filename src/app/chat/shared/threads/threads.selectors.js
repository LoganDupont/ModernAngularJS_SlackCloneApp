import {createSelector} from 'reselect';

export const getThreadsState = (state) => state.threads;

export const getThreadsEntities = createSelector(
    getThreadsState, 
    (state) => state.entities
);

export const getAllThreads = createSelector(
    getThreadsEntities,
    (entities) => Object.keys(entities).map(
        (threadId) => entities[threadId]
    )
);

export const getChannels = createSelector(
    getAllThreads,
    (threads) => threads.filter((t) => t.type === 'channel')
);

export const getDirectMessages = createSelector(
    getAllThreads,
    (threads) => threads.filter((t) => t.type === 'dm')
);

export const getCurrentThread = createSelector(
    getThreadsEntities,
    getThreadsState,
    (entities, state) => entities[state.currentThreadId]
);