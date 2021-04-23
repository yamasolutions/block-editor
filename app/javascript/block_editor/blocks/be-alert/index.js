import React from 'react'
import ReactDOM from 'react-dom'

import {
	InnerBlocks
} from '@wordpress/block-editor';
import { registerBlockStyle } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { rawHandler } from '@wordpress/blocks';

const name = 'be/alert';

export { name };

export const settings = {
	title: 'Callout (Alert)',
	description:  'Container to help draw attention to content.',
  icon: 'align-center',
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
    return (
      <div role="alert" className={ 'alert ' + props.className }>
        <InnerBlocks/>
      </div>
    );
  },
  save() {
    return <div role="alert" className='alert'><InnerBlocks.Content /></div>;
  }
};


<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
