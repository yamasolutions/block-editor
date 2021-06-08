import React from 'react';
import ReactDOM from 'react-dom';

import { widget as icon } from '@wordpress/icons';

const name = 'be/instagram';

export { name };

export const settings = {
	title: 'Instagram',
	description:  'Provide users with a snapshot of your Instagram profile.',
  icon,
  category: 'widgets',
  edit({attributes, className, setAttributes, isSelected}) {
    return ([
      <div className={ className }>
        <p>Instagram</p>
        <div className='be-block-outline'>
        </div>
      </div>
    ]);
  }
};
