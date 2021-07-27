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
import { box as icon } from '@wordpress/icons';

const name = 'be/card';
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/list' ];
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Group a piece of content in an eye catching container.' } ]
];

export { name };

export const settings = {
	title: 'Card',
	description:  'Group a piece of content in an eye catching container.',
  icon,
  category: 'formatting',
  example: {
    attributes: {
      title: 'Container example',
      imageUrl: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
    }
  },
  attributes: {
    title: {
      source: 'text',
      selector: '.card-title'
    },
    imageAlt: {
      attribute: 'alt',
      selector: '.card-img-top'
    },
    imageUrl: {
      attribute: 'src',
      selector: '.card-img-top'
    },
    hasCallToAction: {
      type: 'boolean'
    },
    callToAction: {
      type: 'text'
    },
    url: {
      type: 'text'
    },
    openInNewTab: {
      type: 'boolean'
    }
  },
  edit({attributes, className, setAttributes, isSelected}) {
    const getImageButton = (openEvent) => {
      if(attributes.imageUrl) {
        return (
          <div className="card-img-top">
            { isSelected &&
              <Button
                onClick={ openEvent }
                className="button"
                >
                Edit
              </Button>
            }
            <img
              src={ attributes.imageUrl }
            />
          </div>
        );
      }
      else {
        return (
          <div className="card-img-top block-editor-image-placeholder">
            <Button
              onClick={ openEvent }
              className="button button-large"
            >
            Pick an image
            </Button>
          </div>
        );
      }
    };
    return ([
      <InspectorControls>
				<PanelBody title='Card settings'>
          <TextControl
            label="URL"
            value={ attributes.url }
            onChange={ content => setAttributes({ url: content }) }
          />
          { attributes.url && (
            <ToggleControl
              label="Display Call To Action"
              checked={ attributes.hasCallToAction }
              onChange={ content => setAttributes({ hasCallToAction: content }) }
            />
          )}
          { attributes.url && (
            <ToggleControl
              label="Open in new Tab?"
              checked={ attributes.openInNewTab }
              onChange={ content => setAttributes({ openInNewTab: content }) }
            />
          )}
				</PanelBody>
      </InspectorControls>,
      <div className={ 'card ' + className }>
        <MediaUpload
          onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
          type="image"
          value={ attributes.imageID }
          render={ ({ open }) => getImageButton(open) }
        />
        <div className='card-body'>
          <PlainText
            onChange={ content => setAttributes({ title: content }) }
            value={ attributes.title }
            placeholder="Your card title"
            className="card-title h2"
          />
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
            template={ BLOCKS_TEMPLATE }
          />
          { attributes.hasCallToAction && attributes.url &&
              <PlainText
                onChange={ content => setAttributes({ callToAction: content }) }
                value={ attributes.callToAction }
                placeholder="Your Call To Action"
                className="card-link"
              />
          }
        </div>
      </div>
    ]);
  },
  save({ attributes }) {
    const linkTarget = (attributes.openInNewTab) ? '_blank' : null;
    const cardImage = (src, alt) => {
      if(!src) return null;

      return (
        <img
          className=""
          src={ src }
          alt={ alt }
        />
      );
    }

    return (
      <div className="card">
        { attributes.url ? (
          <a
            href={ attributes.url }
            target= { linkTarget }
            className="card-img-top"
          >
            { cardImage(attributes.imageUrl, attributes.imageAlt) }
          </a>
        ) : (
          <div className="card-img-top">
            { cardImage(attributes.imageUrl, attributes.imageAlt) }
          </div>
        )}
        <div className="card-body">
          <h3 className="card-title">
            { attributes.url ? (
              <a
                href={ attributes.url }
                target= { linkTarget }
              >
                { attributes.title }
              </a>
            ) : (
              attributes.title
            )}
          </h3>
          <div className='card-content'>
            <InnerBlocks.Content />
          </div>
          { attributes.hasCallToAction && attributes.url &&
            <RichText.Content
              tagName="a"
              className='card-link'
              href={ attributes.url }
              target= { linkTarget }
              value={ attributes.callToAction }
            />
          }
        </div>
      </div>
    );
  }
};
