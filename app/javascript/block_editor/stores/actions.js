import {
	UPDATE_BLOCKS,
	PERSIST_BLOCKS,
	FETCH_BLOCKS_FROM_STORAGE,
	PERSIST_BLOCKS_TO_STORAGE,
} from "./action-types";
import { ActionCreators as ReduxUndo } from "redux-undo";

/**
 * Returns an action object used to open/close the inserter.
 *
 * @param {boolean} value A boolean representing whether the inserter should be opened or closed.
 * @return {Object} Action object.
 */
export function setIsInserterOpened( value ) {
	return {
		type: 'SET_IS_INSERTER_OPENED',
		value,
	};
}

export function setPostContent( value ) {
	return {
		type: 'SET_POST_CONTENT',
		value,
	};
}

export function undo() {
	return ReduxUndo.undo();
}

export function redo() {
	return ReduxUndo.redo();
}

export function *updateBlocks( blocks, persist = false ) {

	if( persist ) {
		yield persistBlocksToStorage(blocks);
	}

	return {
		type: persist ? PERSIST_BLOCKS : UPDATE_BLOCKS,
		blocks,
	};
}

export function fetchBlocksFromStorage() {
	return {
		type: FETCH_BLOCKS_FROM_STORAGE,
	};
};

export function persistBlocksToStorage(blocks) {
	return {
		type: PERSIST_BLOCKS_TO_STORAGE,
		blocks,
	};
}
