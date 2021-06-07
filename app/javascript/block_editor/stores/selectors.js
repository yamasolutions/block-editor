import { createRegistrySelector } from '@wordpress/data';

export const getBlocks = ( state ) => {
	return state.history.present.blocks || [];
}

/**
 * Returns true if the inserter is opened.
 *
 * @param  {Object}  state Global application state.
 *
 * @return {boolean} Whether the inserter is opened.
 */
export function isInserterOpened( state ) {
	return state.isInserterOpened;
}

export const hasUndo = (state) => {
	return state.history.past?.length;
};

export const hasRedo = (state) => {
	return state.history.future?.length;
};
