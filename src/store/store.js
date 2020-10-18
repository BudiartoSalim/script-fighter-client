import {createStore, applyMiddleware} from 'redux'
import {connect} from 'react-redux'
const initialState = {
  hp: 10000
}

function reducer(state = initialState , action) {
  switch(action.type) {
    case 'SET_HP' : 
      return {...state, hp: action.payload}
    default :
      return state
  }
}

const store = createStore(reducer)

export default store