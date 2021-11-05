import React from 'react'
import ReactDOM from 'react-dom'

import {
	InnerBlocks, useBlockProps
} from '@wordpress/block-editor';
import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';
import { box as icon } from '@wordpress/icons';

const name = 'be/alert';

export { name };

export const settings = {
  apiVersion: 2,
	title: 'Callout (Alert)',
	description:  'Container to help draw attention to content.',
  icon,
  category: 'formatting',
	styles: [
		{ name: 'primary', label: 'Primary', isDefault: true },
		{ name: 'secondary', label: 'Secondary' },
		{ name: 'success', label: 'Success' },
		{ name: 'danger', label: 'Danger' },
		{ name: 'warning', label: 'Warning' },
		{ name: 'info', label: 'Info' },
		{ name: 'light', label: 'Light' },
		{ name: 'dark', label: 'Dark' }
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
    const blockProps = useBlockProps()

    return (
      <div { ...blockProps }>
        <InnerBlocks/>
      </div>
    );
  },
  save() {
    return <div role="alert" className='alert'><InnerBlocks.Content /></div>;
  }
};
