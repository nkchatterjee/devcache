import { combineReducers } from 'redux';
import userReducer from './userReducer';
import snipReducer from './snipReducer';
import trieReducer from './trieReducer';

export default combineReducers({
    user: userReducer,
    snip: snipReducer,
    trie: trieReducer,
});