import React from 'react';
import ReactDOM from 'react-dom';

import {
	InnerBlocks
} from '@wordpress/block-editor';
import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';

import { TextControl, PanelBody, ToggleControl, Button } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, PlainText } from '@wordpress/block-editor'
import { cover as icon } from '@wordpress/icons';

const BLOCKS_TEMPLATE = [
    [ 'core/heading', { content: 'Example Cover Title' } ],
    [ 'core/paragraph', { content: 'Break up content and draw attention to something using a cover block' } ]
];
const ALLOWED_BLOCKS = [ 'core/buttons', 'core/heading', 'core/paragraph', 'core/list' ];
const name = 'be/cover';

export { name };

export const settings = {
	title: 'Cover',
	description:  'Add an image with a text overlay - great for breaking up content.',
  icon,
  category: 'formatting',
  example: {
    innerBlocks: [
      {
        name: 'core/heading',
        attributes: {
          content: 'Example Cover Title'
        }
      },
      {
        name: 'core/paragraph',
        attributes: {
          content: 'Break up content and draw attention to something using a cover block'
        }
      },
      {
        name: 'core/button',
        attributes: {
          content: 'Example Call To Action'
        }
      }
    ]
  },
  attributes: {
    imageAlt: {
      attribute: 'alt',
      selector: '.wp-block-be-cover-image'
    },
    imageUrl: {
      attribute: 'src',
      selector: '.wp-block-be-cover-image'
    }
  },
  edit({attributes, className, setAttributes, isSelected}) {
    const getImageButton = (openEvent) => {
      if(attributes.imageUrl) {
        return (
          <>
            { isSelected &&
              <Button
                onClick={ openEvent }
                className="button"
                >
                Edit image
              </Button>
            }
            <img
              src={ attributes.imageUrl }
              className="wp-block-be-cover-image"
            />
          </>
        );
      }
      else {
        return (
          <>
          { isSelected &&
            <Button
              onClick={ openEvent }
              className="button button-large"
            >
            Pick an image
            </Button>
          }
          </>
        );
      }
    };
    return (
      <div className={ className }>
        <MediaUpload
          onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
          type="image"
          value={ attributes.imageID }
          render={ ({ open }) => getImageButton(open) }
        />
        <div className='wp-block-be-cover-content'>
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
            template={ BLOCKS_TEMPLATE }
          />
        </div>
      </div>
    );
  },
  save({ attributes }) {
    const cardImage = (src, alt) => {
      if(!src) return null;

      return (
        <img
          className="wp-block-be-cover-image"
          src={ src }
          alt={ alt }
        />
      );
    }

    return (
      <div>
        { cardImage(attributes.imageUrl, attributes.imageAlt) }
        <div className='wp-block-be-cover-content'>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};
