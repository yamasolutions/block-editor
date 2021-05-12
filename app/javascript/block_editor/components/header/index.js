import React from 'react'
import ReactDOM from 'react-dom'

/**
 * WordPress dependencies
 */
import { NavigableToolbar } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { minus as minimizeIcon } from '@wordpress/icons';
import { plus as maximizeIcon } from '@wordpress/icons';

import HistoryUndo from './undo';
import HistoryRedo from './redo';

export default function Header() {
	return (
		<div
			className="block-editor__header"
			role="region"
			tabIndex="-1"
		>
		</div>
	);
}
