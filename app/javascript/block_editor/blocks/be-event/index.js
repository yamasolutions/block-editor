import React from 'react';
import ReactDOM from 'react-dom';

import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';

import { RangeControl, TextControl, PanelBody, ToggleControl, Button } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, PlainText } from '@wordpress/block-editor'
import { calendar as icon } from '@wordpress/icons';

const name = 'be/event';

export { name };

export const settings = {
	title: 'Event',
	description:  'Promote an event.',
  icon,
  category: 'formatting',
  // example: {
  //   attributes: {
  //     title: 'Super awesome event',
  //     subtitle: 'Check it out today',
  //     description: "This super awesome event is coming soon, don't miss out!",
  //     day: "18",
  //     year: "1989",
  //     imageUrl: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
  //   }
  // },
  attributes: {
    title: {
      source: 'text',
      selector: '.wp-block-be-event-title'
    },
    subtitle: {
      source: 'text',
      selector: '.wp-block-be-event-subtitle'
    },
    description: {
      source: 'text',
      selector: '.wp-block-be-event-description'
    },
    day: {
      source: 'text',
      selector: '.wp-block-be-event-day'
    },
    year: {
      source: 'text',
      selector: '.wp-block-be-event-year'
    },
    imageUrl: {
      attribute: 'src',
      selector: '.wp-block-be-event-image img'
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
          <Button
            onClick={ openEvent }
            className="button button-large"
          >
          Pick an image
          </Button>
        );
      }
    };
    return (
      <div className={ 'card ' + className }>
        <div className='wp-block-be-event-date'>
          <PlainText
            onChange={ content => setAttributes({ day: content }) }
            value={ attributes.day }
            placeholder="18"
            className="wp-block-be-event-day"
          />
          <PlainText
            onChange={ content => setAttributes({ year: content }) }
            value={ attributes.year }
            placeholder="Oct 1989"
            className="wp-block-be-event-year"
          />
        </div>
        <div className='wp-block-be-event-info'>
          <PlainText
            onChange={ content => setAttributes({ subtitle: content }) }
            value={ attributes.subtitle }
            placeholder="Subtitle"
            className="wp-block-be-event-subtitle"
          />
          <PlainText
            onChange={ content => setAttributes({ title: content }) }
            value={ attributes.title }
            placeholder="Event Title"
            className="wp-block-be-event-title h4"
          />
        </div>
        <div className='wp-block-be-event-divider'/>
        <PlainText
          onChange={ content => setAttributes({ description: content }) }
          value={ attributes.description }
          placeholder="Event description goes here.."
          className="wp-block-be-event-description"
        />
        <div className='wp-block-be-event-image'>
          <MediaUpload
            onSelect={ media => { setAttributes({ imageUrl: media.url }); } }
            type="image"
            value={ attributes.imageID }
            render={ ({ open }) => getImageButton(open) }
          />
        </div>
      </div>
    );
  },
  save({ attributes }) {
    const eventImage = (src, alt) => {
      if(!src) return null;

      return (
        <img
          src={ src }
          alt={ alt }
        />
      );
    }
    return (
      <div className='card'>
        <div className='wp-block-be-event-date'>
          <span className="wp-block-be-event-day">{ attributes.day }</span>
          <span className="wp-block-be-event-year">{ attributes.year }</span>
        </div>
        <div className='wp-block-be-event-info'>
          <span className="wp-block-be-event-subtitle">{ attributes.subtitle }</span>
          <h4 className="wp-block-be-event-title">{ attributes.title }</h4>
        </div>
        <div className='wp-block-be-event-divider'/>
        <p className="wp-block-be-event-description">{ attributes.description }</p>
        <div className='wp-block-be-event-image'>
          { eventImage(attributes.imageUrl, 'Event Image') }
        </div>
      </div>
    );
  }
};
