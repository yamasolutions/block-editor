import { combineReducers } from '@wordpress/data';

import undoable, { groupByActionTypes, includeAction } from "redux-undo";
import { UPDATE_BLOCKS, PERSIST_BLOCKS } from "./action-types";

function blocksReducer(state = [], action) {
	switch (action.type) {
		case UPDATE_BLOCKS:
		case PERSIST_BLOCKS:
			const { blocks } = action;

			return {
				blocks,
			};
	}

	return state;
}


/**
 * Reducer tracking whether the inserter is open.
 *
 * @param {boolean} state
 * @param {Object}  action
 */
function isInserterOpened( state = true, action ) {
	switch ( action.type ) {
		case 'SET_IS_INSERTER_OPENED':
			return action.value;
	}
	return state;
}

export default undoable(blocksReducer, {
	filter: includeAction(PERSIST_BLOCKS),
});

// TODO: How do we export both undoable and isInserterOpened ?
// export default combineReducers( {
//   isInserterOpened,
//   undoable(blocksReducer, {
//     filter: includeAction("PERSIST_BLOCKS")
//   })
// } );
