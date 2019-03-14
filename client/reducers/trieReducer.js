import * as types from '../constants/actionTypes';
import Trie from '../constants/trie'
import { debug } from 'util';

const initialState = {
  tagTrie: new Trie(''),
  validChildren: [],
}

// ** tagTrie IS NOT PURE **
// DO NOT DEPEND ON tagTrie FOR RENDERS

const trieReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.TRIE_INSERT:
      state.tagTrie.insert(action.payload.tag);
      return {
        ...state,
      }

    case types.TRIE_FIND:
      return {
        ...state,
      }

    case types.TRIE_FIND_CHILDREN:
      const newValidChildren = state.tagTrie.findChildren(action.payload)   
      return {
        ...state,
        validChildren: newValidChildren,
      }
    default:
      return state
  }
}

export default trieReducer;