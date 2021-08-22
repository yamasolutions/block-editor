import React from 'react'
import ReactDOM from 'react-dom'

import {
	InnerBlocks
} from '@wordpress/block-editor';
import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';
import { box as icon } from '@wordpress/icons';

const name = 'integral/foundation-callout';

export { name };

export const settings = {
	title: 'Callout (OLD)',
	description:  'Container to help draw attention to content.',
  icon,
  category: 'formatting',
	styles: [
		{ name: 'default', label: 'Default', isDefault: true },
		{ name: 'primary', label: 'Primary' },
		{ name: 'secondary', label: 'Secondary' },
		{ name: 'warning', label: 'Warning' },
		{ name: 'alert', label: 'Alert' },
		{ name: 'success', label: 'Success' }
	],
  example: {
    innerBlocks: [
      {
        name: 'core/paragraph',
        attributes: {
          content: 'Use a callout to grab the users attention.'
        }
      }
    ]
  },
  edit(props) {
    return (
      <div role="alert" className={ 'alert wp-block-be-alert ' + props.className }>
        <InnerBlocks/>
      </div>
    );
  },
  save() {
    return <div role="alert" className='wp-block-be-alert alert'><InnerBlocks.Content /></div>;
  },
  transforms: {
    to: [
      {
        type: 'block',
        blocks: [ 'be/alert' ],
        transform: ( attributes, innerBlocks ) => {
          return createBlock(
            'be/alert',
            attributes,
            innerBlocks
          );
        },
      },
    ],
  },
  deprecated: [
    {
      save() {
        return <div className='callout'><InnerBlocks.Content /></div>;
      }
    }
  ]
};
