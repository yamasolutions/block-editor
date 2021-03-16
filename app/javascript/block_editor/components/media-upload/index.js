import React from 'react'
import ReactDOM from 'react-dom'

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class MediaUpload extends Component {
  constructor( {
    allowedTypes,
    gallery = false,
    unstableFeaturedImageFlow = false,
    modalClass,
    multiple = false,
    title =  'Select or Upload Media',
  } ) {
    super( ...arguments );
    this.openUploader = this.openUploader.bind( this );
  }

  openUploader() {
    if (window.MediaUploader == undefined) {
      console.log('window.MediaUploader undefined. Pulling in random image from Unsplash')

      this.props.onSelect( { url: 'https://source.unsplash.com/random/800x500' });
    } else {
      this.MediaUploader.open(this.props.onSelect);
    }
  }

  render() {
    return this.props.render( { open: this.openUploader } );
  }
}

export default MediaUpload;
