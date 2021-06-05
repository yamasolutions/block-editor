import React from 'react'
import ReactDOM from 'react-dom'
/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary - currently required otherwise notices fails to initialized, think the data store is being registered
import '@wordpress/format-library';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { serialize, parse } from '@wordpress/blocks';
import { InterfaceSkeleton, FullscreenMode } from '@wordpress/interface';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
  BlockBreadcrumb,
  __experimentalLibrary as Library,
} from '@wordpress/block-editor';
import {
  Popover,
  SlotFillProvider,
  DropZoneProvider,
  FocusReturnProvider
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Sidebar from '../sidebar';
import Header from '../header';
import Notices from '../notices';
import '../../stores'; // TODO: Think this store registering needs to be moved somewhere else so that it happens everytime a BlockEditor is initialized

function BlockEditor( { input, settings: _settings } ) {
  const blocks = useSelect((select) => select("block-editor").getBlocks());
  const { updateBlocks } = useDispatch("block-editor");
  const __experimentalReusableBlocks = useSelect((select) => select( 'core' ).getEntityRecords('postType', 'wp_block', { per_page: -1 }));
  const settings = { ..._settings, __experimentalReusableBlocks };

  function handleInput(newBlocks, persist) {
    updateBlocks(newBlocks);
    input.value = serialize(newBlocks);
  }

  function handleChange(newBlocks) {
    updateBlocks(newBlocks, true);
    input.value = serialize(newBlocks);
  }

  // Registering the shortcuts
  const { registerShortcut } = useDispatch( 'core/keyboard-shortcuts' );
  useEffect( () => {
    registerShortcut( {
      name: 'core/editor/undo',
      category: 'global',
      description: 'Undo your last changes.',
      keyCombination: {
        modifier: 'primary',
        character: 'z',
      },
    } );

    registerShortcut( {
      name: 'core/editor/redo',
      category: 'global',
      description: 'Redo your last undo.',
      keyCombination: {
        modifier: 'primaryShift',
        character: 'z',
      },
    } );
  })

  const { redo, undo } = useDispatch( 'block-editor' );

  useShortcut(
    'core/editor/undo',
    ( event ) => {
      undo();
      event.preventDefault();
    },
    { bindGlobal: true }
  );

  useShortcut(
    'core/editor/redo',
    ( event ) => {
      redo();
      event.preventDefault();
    },
    { bindGlobal: true }
  );

  return (
    <>
      <FullscreenMode isActive={false} />
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider
            value={ blocks }
            onInput={ handleInput }
            onChange={ handleChange }
            settings={ settings }
          >
            <FocusReturnProvider>
              <InterfaceSkeleton
                header={<Header />}
                footer={<BlockBreadcrumb />}
                sidebar={<Sidebar />}
                leftSidebar={ <Library /> }
                content={
                  <>
                    <Notices />
                    <Sidebar.InspectorFill>
                      <BlockInspector />
                    </Sidebar.InspectorFill>
                    <BlockEditorKeyboardShortcuts.Register />
                    <BlockEditorKeyboardShortcuts />
                    <WritingFlow>
                      <ObserveTyping>
                        <BlockList className="editor-styles-wrapper" />
                      </ObserveTyping>
                    </WritingFlow>
                  </>
                }
              />
              <Popover.Slot />
            </FocusReturnProvider>
          </BlockEditorProvider>
        </DropZoneProvider>
      </SlotFillProvider>
    </>
  );
}

export default BlockEditor;
