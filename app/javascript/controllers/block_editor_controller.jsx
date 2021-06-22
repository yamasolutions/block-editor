import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Controller } from "stimulus"

import { render } from '@wordpress/element'

import BlockEditor from '../block_editor/components/block-editor'
import { registerBlocks } from '../block_editor/blocks'

registerBlocks()

export default class extends Controller {
  static targets = [ "output", "input" ]

  connect() {
    const settings = {
      alignWide: true,
      imageSizes: [
        { slug: 'thumbnail', name: 'Thumbnail' },
        { slug: 'small', name: 'Small' },
        { slug: 'medium', name: 'Medium' },
        { slug: 'large', name: 'Large' },
        { slug: 'full', name: 'Full Size' },
      ],
      __experimentalFeatures: {
        global: {
          color: {
            custom: false,
            palette: [
              {
                name: "Primary",
                slug: "primary",
                color: "#6D9C5F"
              },
              {
                name: "Secondary",
                slug: "secondary",
                color: "#998867"
              },
              {
                name: "White",
                slug: "white",
                color: "#fff"
              }
            ],
            gradients: []
          },
          typography: {
            dropCap: false,
            fontSizes: false,
            customLineHeight: false
          }
        }
      },
      mediaUpload:  function uploadMedia( {
        allowedTypes,
        additionalData = {},
        filesList,
        maxUploadFileSize,
        onError = noop,
        onFileChange,
        wpAllowedMimeTypes = null,
      } ) {
      }
    }

    window.localStorage.setItem("blockEditorBlocks", this.inputTarget.value);
    this.editor = render( <BlockEditor input={ this.inputTarget } settings={ settings } />, this.outputTarget )
  }
}
