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
      __experimentalFeatures: {
        global: {
          color: {
            custom: false,
            palette: [],
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
