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
      title: 'Absolutely amazing!',
      author: 'John Doe',
      date: '18 Oct 1989',
      body: ["Great! Can't wait to try it again."],
      rating: 5,
      imageUrl: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
    }
  },
  attributes: {
    title: {
      source: 'text',
      selector: '.card-title'
    },
    author: {
      source: 'text',
      selector: '.card-author'
    },
    date: {
      source: 'text',
      selector: '.card-date'
    },
    body: {
      type: 'array',
      source: 'children',
      selector: '.card-content'
    },
    rating: {
      type: 'number',
      default: 4
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
            Pick an image
            </Button>
          </div>
        );
      }
    };
    return ([
      <InspectorControls>
				<PanelBody title='Review settings'>
          <RangeControl
              label="Rating"
              value={ attributes.rating }
              onChange={ ( content ) => setAttributes( { rating: content } ) }
              min={ 1 }
              max={ 5 }
          />
				</PanelBody>
      </InspectorControls>,
      <div className={ 'card ' + className }>
        <div className='card-body'>
          <div className='card-img-top'>
            <MediaUpload
              onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
              type="image"
              value={ attributes.imageID }
              render={ ({ open }) => getImageButton(open) }
            />
          </div>
          <PlainText
            onChange={ content => setAttributes({ title: content }) }
            value={ attributes.title }
            placeholder="Catchy review title"
            className="card-title h4"
          />
          <div className='card-star-rating'>
            {[...Array(attributes.rating)].map((value, index) => {
              return <i className='bi bi bi-star-fill'></i>
            })}
          </div>
          <RichText
            onChange={ content => setAttributes({ body: content }) }
            value={ attributes.body }
            multiline="p"
            placeholder="Review testimonial.."
            className="card-content"
          />
        </div>
        <div className='card-footer'>
          <PlainText
            onChange={ content => setAttributes({ author: content }) }
            value={ attributes.author }
            placeholder="Patrick Lindsay"
            className="card-author"
          />
          <PlainText
            onChange={ content => setAttributes({ date: content }) }
            value={ attributes.date }
            placeholder="Oct 18, 1989"
            className="card-date"
          />
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
      <div className="card">
        <div className="card-body">
          <div className="card-img-top">
            { reviewImage(attributes.imageUrl, attributes.imageAlt) }
          </div>

          <h4 className="card-title">
            { attributes.title }
          </h4>
          <div className='card-star-rating'>
            {[...Array(attributes.rating)].map((value, index) => {
              return <i className='bi bi-star-fill'></i>
            })}
          </div>
          <div className='card-content'>
            { attributes.body }
          </div>
        </div>
        <div className="card-footer">
          <span className="card-author">{ attributes.author }</span>
          <span className="card-date">{ attributes.date }</span>
        </div>
      </div>
    );
  }
};


