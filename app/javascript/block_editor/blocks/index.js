/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { assign } from 'lodash';

/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import { registerCoreBlocks } from '@wordpress/block-library'
import '@wordpress/block-editor';
import {
  registerBlockType,
  unregisterBlockType,
  registerBlockStyle,
  unregisterBlockStyle,
  unregisterBlockVariation
} from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose'
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import ColumnEdit from './column/edit';
import ButtonEdit from './button/edit';
import BlockEdit from './block/edit';
import MediaUpload from '../components/media-upload';

import * as accordion from './be-accordion';
import * as callout from './be-alert';
import * as card from './be-card';
import * as cover from './be-cover';
import * as recentPosts from './be-recent-posts';
import * as contactForm from './be-contact-form';
import * as instagram from './be-instagram';
import * as review from './be-review';
import * as event from './be-event';
import * as menuItem from './be-menu-item';
import * as menuItemSub from './be-menu-item-sub';

export const registerBlocks = () => {
  // TODO: Remove this when upgrading to 10.5 -> https://github.com/WordPress/gutenberg/pull/30194
  const replaceButtonBlockEdit = ( settings, name ) => {
    if ( name !== 'core/button' ) {
      return settings;
    }

    return assign( {}, settings, {
      edit: ButtonEdit // Removes border radius panel
    })
  }

  const replaceBlockEdit = ( settings, name ) => {
    if ( name !== 'core/block' ) {
      return settings;
    }

    return assign( {}, settings, {
      edit: BlockEdit // Removes 'convert to regular blocks' toolbar button
    })
  }

  const replaceColumnBlockEdit = ( settings, name ) => {
    if ( name !== 'core/column' ) {
      return settings;
    }

    return assign( {}, settings, {
      edit: ColumnEdit // Removes column width options
    } );
  }

  // Set default alignment to 'full' for all images
  const setDefaultAlignment = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
      if ( props.name !== 'core/image' ) {
        return <BlockListBlock { ...props } />;
      }

      props.attributes.align = 'full';

      return <BlockListBlock { ...props } />;
    };
  }, 'setDefaultAlignment' );

  const replaceMediaUpload = () => MediaUpload;

  addFilter(
    'editor.BlockListBlock',
    'block-editor/filters/core-image-block-list',
    setDefaultAlignment
  );

  addFilter(
    'blocks.registerBlockType',
    'block-editor/filters/core-block',
    replaceBlockEdit
  );

  addFilter(
    'blocks.registerBlockType',
    'block-editor/filters/core-button',
    replaceButtonBlockEdit
  );

  addFilter(
    'blocks.registerBlockType',
    'block-editor/filters/core-column',
    replaceColumnBlockEdit
  );

  addFilter(
    'editor.MediaUpload',
    'block-editor/filters/media-upload',
    replaceMediaUpload
  );

  // Register WP blocks
  registerCoreBlocks();

  // Unregister WP blocks which are not supported
  unregisterBlockType('core/gallery');
  unregisterBlockType('core/quote');
  unregisterBlockType('core/shortcode');
  unregisterBlockType('core/archives');
  unregisterBlockType('core/audio');
  unregisterBlockType('core/calendar');
  unregisterBlockType('core/categories');
  unregisterBlockType('core/code');
  unregisterBlockType('core/cover');
  unregisterBlockType('core/embed');
  unregisterBlockType('core/file');
  unregisterBlockType('core/media-text');
  unregisterBlockType('core/latest-comments');
  unregisterBlockType('core/latest-posts');
  unregisterBlockType('core/more');
  unregisterBlockType('core/nextpage');
  unregisterBlockType('core/preformatted');
  unregisterBlockType('core/pullquote');
  unregisterBlockType('core/rss');
  unregisterBlockType('core/search');
  unregisterBlockType('core/social-links');
  unregisterBlockType('core/social-link');
  unregisterBlockType('core/spacer');
  unregisterBlockType('core/subhead');
  unregisterBlockType('core/tag-cloud');
  unregisterBlockType('core/text-columns');
  unregisterBlockType('core/verse');
  unregisterBlockType('core/video');

  // Unregister WP block styles
  unregisterBlockStyle('core/separator', 'wide');
  unregisterBlockStyle('core/button', 'fill');
  unregisterBlockStyle('core/button', 'outline');
  unregisterBlockStyle('core/image', 'default');
  unregisterBlockStyle('core/image', 'rounded');
  unregisterBlockStyle('core/table', 'regular');
  unregisterBlockStyle('core/table', 'stripes');

  // Unregister WP block variations
  unregisterBlockVariation('core/columns', 'two-columns-one-third-two-thirds');
  unregisterBlockVariation('core/columns', 'two-columns-two-thirds-one-third');
  unregisterBlockVariation('core/columns', 'three-columns-wider-center');

  // Register custom blocks
  registerBlockType(accordion.name, accordion.settings);
  registerBlockType(callout.name, callout.settings);
  registerBlockType(card.name, card.settings);
  registerBlockType(contactForm.name, contactForm.settings);
  registerBlockType(instagram.name, instagram.settings);
  registerBlockType(review.name, review.settings);
  registerBlockType(event.name, event.settings);
  registerBlockType(menuItem.name, menuItem.settings);
  registerBlockType(menuItemSub.name, menuItemSub.settings);
  registerBlockType(cover.name, cover.settings);
  registerBlockType(recentPosts.name, recentPosts.settings);

  // Register custom block styles
  registerBlockStyle( 'core/button', {
    name: 'primary',
    label: 'Primary',
    isDefault: true
  } );
  registerBlockStyle( 'core/button', {
    name: 'secondary',
    label: 'Secondary'
  } );
  registerBlockStyle( 'core/button', {
    name: 'outline-primary',
    label: 'Primary (Outlined)'
  } );
  registerBlockStyle( 'core/button', {
    name: 'outline-secondary',
    label: 'Secondary (Outlined)'
  } );
  registerBlockStyle( 'core/table', {
    name: 'unstriped',
    label: 'Unstriped',
    isDefault: true
  } );
  registerBlockStyle( 'core/table', {
    name: 'striped',
    label: 'Striped'
  } );
  registerBlockStyle( 'core/image', {
    name: 'default',
    label: 'Default',
    isDefault: true
  } );
  registerBlockStyle( 'core/image', {
    name: 'padded',
    label: 'Padded'
  } );
  registerBlockStyle( 'core/columns', {
    name: 'no-stack',
    label: 'No Stacking'
  } );
};
