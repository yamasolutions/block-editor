import React from 'react'
import ReactDOM from 'react-dom'

/**
 * External dependencies
 */
import Textarea from 'react-autosize-textarea';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { parse } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { useInstanceId } from '@wordpress/compose';
import { VisuallyHidden } from '@wordpress/components';

/**
 * TODO: Need it not to reset textarea on every input - it's something to do with the dirty flags - we need to keep track of the newValue somewhere
 * TODO: Properly update the actual input when making edits (think this might be done)
 */
export default function TextEditor(props) {
  const { value, handleChange } = props;

  const postContent = useSelect((select) => select("block-editor").getPostContent());
  const { setPostContent } = useDispatch("block-editor");

	// const postContent = useSelect(
	// 	( select ) => select( 'core/editor' ).getEditedPostContent(),
	// 	[]
	// );

  // // TODO: Get value from input/localStorage
  // const value = 'foo bar baz';

	// const { editPost, resetEditorBlocks } = useDispatch( 'core/editor' );

	//const [ value, setValue ] = useState( postContent );
	const [ isDirty, setIsDirty ] = useState( false );
	// const instanceId = useInstanceId( PostTextEditor );
  
	// if ( ! isDirty && value !== postContent ) {
  //   console.log('using postContent')
	// 	const textValue = postContent;
	// } else {
  //   console.log('using value')
	// 	const textValue = value;
  // }


	const textValue = isDirty ? postContent : value;
	if (isDirty) {
    console.log('using postContent');
		//return postContent;
	} else {
    console.log('using value');
		// return value;
  }



	/**
	 * Handles a textarea change event to notify the onChange prop callback and
	 * reflect the new value in the component's own state. This marks the start
	 * of the user's edits, if not already changed, preventing future props
	 * changes to value from replacing the rendered value. This is expected to
	 * be followed by a reset to dirty state via `stopEditing`.
	 *
	 * @see stopEditing
	 *
	 * @param {Event} event Change event.
	 */
	const onChange = ( event ) => {
    const newValue = event.target.value;

    console.log('new value');
    console.log(newValue);
    setPostContent(newValue);

    // // TODO: We may want to only parse this on the blur thing i.e. stopEditing - otherwise it parses the input on every Change which means unable to make proper changes as each keypress is validated/processed into valid block markup
    // // Instead here we need to possibly save into memory? Or nothing and just mark it as dirty?
    // handleChange(parse(newValue));
		// // editPost( { content: newValue } );
    // //
		// // setValue( newValue );
    setIsDirty( true );
	};

	/**
	 * Function called when the user has completed their edits, responsible for
	 * ensuring that changes, if made, are surfaced to the onPersist prop
	 * callback and resetting dirty state.
	 */
	const stopEditing = () => {
		if ( isDirty ) {
			// const blocks = parse( value );
      console.log('DIRTY!');
      console.log(postContent); // TODO: For some reason postContent is returning undefined here (?)
      handleChange(parse(postContent));
			// resetEditorBlocks( blocks );
      setIsDirty( false );
		}
	};

	return (
		<>
			<Textarea
				autoComplete="off"
				dir="auto"
				value={ textValue }
				onChange={ onChange }
				onBlur={ stopEditing }
				className="editor-post-text-editor"
				// id={ `post-content-${ instanceId }` }
				placeholder={ __( 'Start writing with text or HTML' ) }
			/>
		</>
	);
}
