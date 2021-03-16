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
import { InterfaceSkeleton as EditorSkeleton } from '@wordpress/interface';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
  BlockBreadcrumb,
} from '@wordpress/block-editor';
import {
  Popover,
  SlotFillProvider,
  DropZoneProvider,
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

  function handleInput(newBlocks, persist) {
    updateBlocks(newBlocks);
    input.value = serialize(newBlocks);
  }

  function handleChange(newBlocks) {
    updateBlocks(newBlocks, true);
    input.value = serialize(newBlocks);
  }

  return (
    <SlotFillProvider>
      <DropZoneProvider>
        <EditorSkeleton
          sidebar={<Sidebar />}
          content={
            <>
            <Notices />
            <BlockEditorProvider
              value={ blocks }
              onInput={ handleInput }
              onChange={ handleChange }
              settings={ _settings }
            >
              <Header />
              <BlockBreadcrumb />
              <Sidebar.InspectorFill>
                <BlockInspector />
              </Sidebar.InspectorFill>
              <div className="block-editor__inner-wrapper">
                <BlockEditorKeyboardShortcuts.Register />
                <BlockEditorKeyboardShortcuts />
                <WritingFlow>
                  <ObserveTyping>
                    <BlockList className="editor-styles-wrapper" />
                  </ObserveTyping>
                </WritingFlow>
              </div>
            </BlockEditorProvider>
            </>
          }
        />
        <Popover.Slot />
      </DropZoneProvider>
    </SlotFillProvider>
  );
}

export default BlockEditor;

