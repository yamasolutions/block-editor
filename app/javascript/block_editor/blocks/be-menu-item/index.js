import React from 'react';
import ReactDOM from 'react-dom';

import {
	InnerBlocks
} from '@wordpress/block-editor';
import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';

import { RangeControl, TextControl, PanelBody, ToggleControl, Button } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, PlainText } from '@wordpress/block-editor'
import { box as icon } from '@wordpress/icons';


const name = 'be/menu-item';
// const BLOCKS_TEMPLATE = [
//   [ 'be/menu-item-sub', { title: 'Menu item sub title' } ]
// ];
const ALLOWED_BLOCKS = [ 'be-menu-item-sub' ];

export { name };
export const settings = {
	title: 'Menu Item',
	description:  'Add an item to your menu.',
  icon,
  category: 'formatting',
  attributes: {
    title: {
      source: 'text',
      selector: '.wp-block-be-menu-item-title'
    },
    description: {
      source: 'text',
      selector: '.wp-block-be-menu-item-description'
    },
    cost: {
      source: 'text',
      selector: '.wp-block-be-menu-item-cost'
    },
    isVegan: {
      type: 'boolean',
      default: false
    },
    isVegetarian: {
      type: 'boolean',
      default: false
    },
    isGlutenFree: {
      type: 'boolean',
      default: false
    },
  },
  edit({attributes, className, setAttributes, isSelected}) {
    return ([
			<InspectorControls>
				<PanelBody title={ 'Menu item settings' }>
					<ToggleControl
						label={ 'Vegetarian' }
            onChange={ content => setAttributes({ isVegetarian: content }) }
            checked={ attributes.isVegetarian }
					/>
					<ToggleControl
						label={ 'Vegan' }
            onChange={ content => setAttributes({ isVegan: content }) }
            checked={ attributes.isVegan }
					/>
					<ToggleControl
						label={ 'Gluten free' }
            onChange={ content => setAttributes({ isGlutenFree: content }) }
            checked={ attributes.isGlutenFree }
					/>
				</PanelBody>
			</InspectorControls>,
      <div className= {className}>
        <div className='wp-block-be-menu-item-wrapper'>
          <div className='wp-block-be-menu-item-title-wrapper'>
            <PlainText
              onChange={ content => setAttributes({ title: content }) }
              value={ attributes.title }
              placeholder="Catchy menu item title"
              className="wp-block-be-menu-item-title h3"
            />
            <div className='wp-block-be-menu-item-badges'>
              { attributes.isVegan &&
                <img
                  className="wp-block-be-menu-item-badge"
                  src={ "https://source.unsplash.com/random/800x500" }
                  alt={ "This is a vegan friendly menu item." }
                />
              }
            </div>
          </div>
          <PlainText
            onChange={ content => setAttributes({ cost: content }) }
            value={ attributes.cost }
            placeholder="$--.00"
            className="wp-block-be-menu-item-cost"
          />
        </div>
        <PlainText
          onChange={ content => setAttributes({ description: content }) }
          value={ attributes.description }
          placeholder="Describe your menu item.."
          className="wp-block-be-menu-item-description"
        />
        <div className='wp-block-be-menu-item-subs'>
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
          />
        </div>
      </div>
    ]);
  },
  save({ attributes }) {
    return (
      <div>
        <div className='wp-block-be-menu-item-wrapper'>
          <div>
            <div className='wp-block-be-menu-item-title-wrapper'>
              <h3 className="wp-block-be-menu-item-title">{ attributes.title }</h3>
              <div className='wp-block-be-menu-item-badges'>
                { attributes.isVegan &&
                  <img
                    className="wp-block-be-menu-item-badge"
                    src={ "https://source.unsplash.com/random/800x500" }
                    alt={ "This is a vegan friendly menu item." }
                  />
                }
              </div>
            </div>
          </div>
          <span className="wp-block-be-menu-item-cost">{ attributes.cost }</span>
        </div>
        <p className="wp-block-be-menu-item-description">{ attributes.description }</p>
        <div className='wp-block-be-menu-item-subs'>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
};
