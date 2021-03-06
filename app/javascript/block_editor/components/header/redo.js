import React from 'react';
import ReactDOM from 'react-dom';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { displayShortcut } from '@wordpress/keycodes';
import { redo as redoIcon } from '@wordpress/icons';

function HistoryRedo( { hasRedo, redo, ...props } ) {
	return (
		<Button
			{ ...props }
			icon={ redoIcon }
			label={ __( 'Redo' ) }
			shortcut={ displayShortcut.primaryShift( 'z' ) }
			// If there are no redo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasRedo }
			onClick={ hasRedo ? redo : undefined }
			className="editor-history__redo"
		/>
	);
}

const EnhancedHistoryRedo = compose( [
	withSelect( ( select ) => ( {
		hasRedo: select( 'block-editor' ).hasRedo(),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		redo: dispatch( 'block-editor' ).redo,
	} ) ),
] )( HistoryRedo );

export default EnhancedHistoryRedo;
