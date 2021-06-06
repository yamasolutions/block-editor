import { createRegistrySelector } from '@wordpress/data';

export const getBlocks = ( state ) => {
	return state.present.blocks || [];
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
	return state.past?.length;
};

export const hasRedo = (state) => {
	return state.future?.length;
};
