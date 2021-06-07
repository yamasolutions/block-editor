import React from 'react'
import ReactDOM from 'react-dom'

/**
 * WordPress dependencies
 */
import { NavigableToolbar } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { resizeCornerNE as minimizeIcon } from '@wordpress/icons';
import { close as closeIcon } from '@wordpress/icons';
import { plus as openIcon } from '@wordpress/icons';
import { fullscreen as maximizeIcon } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';

import HistoryUndo from './undo';
import HistoryRedo from './redo';

export default function Header() {
  const { setIsInserterOpened } = useDispatch( 'block-editor' );
  const isInserterOpened = useSelect((select) => select("block-editor").isInserterOpened());

	return (
		<div
			className="block-editor__header"
			role="region"
			tabIndex="-1"
		>
      <div>
        { !isInserterOpened &&
          <Button isPrimary
            icon={ openIcon }
            label={ 'Open Library' }
            onClick={ () =>
              setIsInserterOpened( true )
            }
          />
        }
        { isInserterOpened &&
          <Button isSecondary
            icon={ closeIcon }
            label={ 'Close Library' }
            onClick={ () =>
              setIsInserterOpened( false )
            }
          />
        }
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
