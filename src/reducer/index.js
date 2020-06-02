import { combineReducers } from 'redux';
import dialogs from './dialogsReducer';
import exercises from './exercisesReducer';

export default combineReducers({dialogs, exercises})
