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
      <div>
        <HistoryUndo />
        <HistoryRedo />
        <Button
          icon={ maximizeIcon }
          label={ 'Fullscreen' }
          // shortcut={ displayShortcut.primary( 'x' ) }
          className="block-editor__size-toggle-button block-editor__size-toggle-button__maximize"
          onClick={() => document.querySelector('.block-editor').classList.add('block-editor__fullscreen')}
        />
        <Button
          icon={ minimizeIcon }
          label={ 'Minimize' }
          // shortcut={ displayShortcut.primary( 'x' ) }
          className="block-editor__size-toggle-button block-editor__size-toggle-button__minimize"
          onClick={() => document.querySelector('.block-editor').classList.remove('block-editor__fullscreen')}
        />

      </div>
		</div>
	);
}
