import React from 'react';
import ReactDOM from 'react-dom';

import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';

import { RangeControl, TextControl, PanelBody, ToggleControl, Button } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, PlainText } from '@wordpress/block-editor'
import { starFilled as icon } from '@wordpress/icons';

const name = 'be/review';

export { name };

export const settings = {
	title: 'Review',
	description:  'Share a review from a customer.',
  icon,
  category: 'formatting',
  example: {
    attributes: {
      author: 'John Doe',
      location: 'Newcastle, England',
      body: ["Great! Can't wait to try it again."],
      imageUrl: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
    }
  },
  attributes: {
    author: {
      source: 'text',
      selector: '.testimonial--name'
    },
    location: {
      source: 'text',
      selector: '.testimonial--location'
    },
    body: {
      source: 'text',
      selector: '.testimonial--body'
    },
    imageAlt: {
      attribute: 'alt',
      selector: '.card-img-top img'
    },
    imageUrl: {
      attribute: 'src',
      selector: '.card-img-top img'
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
                Edit
              </Button>
            }
            <img
              src={ attributes.imageUrl }
            />
          </>
        );
      }
      else {
        return (
          <div className="block-editor-image-placeholder">
            <Button
              onClick={ openEvent }
              className="button button-large"
            >
            img
            </Button>
          </div>
        );
      }
    };
    return ([
      <div className="wp-block-be-review">
        <RichText
          onChange={ content => setAttributes({ body: content }) }
          value={ attributes.body }
          multiline={ false }
          placeholder="Review testimonial.."
          className="testimonial--body"
        />
        <div className='card-divider'>
          <MediaUpload
            onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
            type="image"
            value={ attributes.imageID }
            render={ ({ open }) => getImageButton(open) }
          />
          <div>
            <PlainText
              onChange={ content => setAttributes({ author: content }) }
              value={ attributes.author }
              placeholder="Customer Name"
              className="testimonial--name"
            />
            <PlainText
              onChange={ content => setAttributes({ location: content }) }
              value={ attributes.location }
              placeholder="City, Country"
              className="testimonial--location"
            />
          </div>
        </div>
      </div>
    ]);
  },
  save({ attributes }) {
    const reviewImage = (src, alt) => {
      if(!src) return null;

      return (
        <img
          src={ src }
          alt={ alt }
        />
      );
    }
    return (
      <div>
        <p className="testimonial--body">{ attributes.body }</p>
        <div className='card-divider'>
          { reviewImage(attributes.imageUrl, attributes.imageAlt) }
          <div>
            <span className="testimonial--name">{ attributes.author }</span>
            <span className="testimonial--location">{ attributes.location }</span>
          </div>
        </div>
      </div>
    );
  }
};
