import React from 'react';
import ReactDOM from 'react-dom';

import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';

import { RangeControl, TextControl, PanelBody, ToggleControl, Button } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, PlainText } from '@wordpress/block-editor'
import { box as icon } from '@wordpress/icons';

const name = 'be/menu-item-sub';

export { name };
export const settings = {
	title: 'Menu Item Sub',
	description:  'Add a substitute to your menu item.',
  icon,
  category: 'formatting',
  parent: [ 'be/menu-item' ],
  attributes: {
    title: {
      source: 'text',
      selector: '.wp-block-be-menu-item-sub-title'
    },
    cost: {
      source: 'text',
      selector: '.wp-block-be-menu-item-sub-cost'
    }
  },
  edit({attributes, className, setAttributes, isSelected}) {
    return ([
      <div className= {className}>
        <PlainText
          onChange={ content => setAttributes({ title: content }) }
          value={ attributes.title }
          placeholder="Catchy menu item sub title"
          className="wp-block-be-menu-item-sub-title"
        />
        <PlainText
          onChange={ content => setAttributes({ cost: content }) }
          value={ attributes.cost }
          placeholder="$--.00"
          className="wp-block-be-menu-item-sub-cost"
        />
      </div>
    ]);
  },
  save({ attributes }) {
    return (
      <div>
        <span className="wp-block-be-menu-item-sub-title">{ attributes.title }</span>
        <span className="wp-block-be-menu-item-sub-cost">{ attributes.cost }</span>
      </div>
    );
  }
};
