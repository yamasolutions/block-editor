import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { PanelBody, ToggleControl } from '@wordpress/components';
import { InnerBlocks, InspectorControls, PlainText } from '@wordpress/block-editor'
import { box as icon } from '@wordpress/icons';

const name = 'be/accordion';

export { name };

export const settings = {
	title: 'Accordion',
	description:  'Accordions are elements that help you organize and navigate multiple documents in a single container.',
  icon,
  category: 'layout',
  attributes: {
    blockId: {
      type: 'string'
    },
    title: {
      source: 'text',
      selector: '.accordion-button'
    },
    isOpenByDefault: {
      type: 'boolean',
      default: true
    }
  },
  example: {
    attributes: {
      title: 'Open by default accordion'
    },
    innerBlocks: [
      {
        name: 'core/paragraph',
        attributes: {
          content: 'Use an accordion to structure and optionally collapse content'
        }
      }
    ]
  },
  edit({clientId, attributes, className, setAttributes, isSelected}) {
    const { blockId } = attributes;
    if ( ! blockId ) {
      setAttributes( { blockId: `id-${clientId}` } );
    } else if ( blockId != clientId ) {
      setAttributes( { blockId: `id-${clientId}` } );
    }

    // TODO: Update this to check if this OR any of the innerblocks are selected
    // let inlineStyle = (isSelected || attributes.isOpenByDefault) ? { display: 'block' } : {};
    let inlineStyle = { display: 'block' };

    return [
			<InspectorControls>
				<PanelBody title={ 'Accordion settings' }>
					<ToggleControl
						label={ 'Open by default' }
            onChange={ content => setAttributes({ isOpenByDefault: content }) }
            checked={ attributes.isOpenByDefault }
					/>

				</PanelBody>
			</InspectorControls>,

      <div className="wp-block-be-accordion accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <PlainText
              onChange={ content => setAttributes({ title: content }) }
              value={ attributes.title }
              placeholder="Your accordion title"
              className="accordion-button"
            />
          </h2>
          <div className="accordion-collapse collapse show">
            <div className="accordion-body" style={ inlineStyle }>
              <InnerBlocks/>
            </div>
          </div>
        </div>
      </div>
    ];
  },
  save({ attributes }) {
    let buttonVisibilityClass = attributes.isOpenByDefault ? "" : "collapsed";
    let accordionVisibilityClass = attributes.isOpenByDefault ? "show" : "";

    return (
      <div className="wp-block-be-accordion accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className={ "accordion-button " + buttonVisibilityClass } type="button" data-bs-toggle="collapse" data-bs-target={ "#" + attributes.blockId }>
              { attributes.title }
            </button>
          </h2>
          <div id={attributes.blockId} className={ "accordion-collapse collapse " + accordionVisibilityClass }>
            <div className="accordion-body">
                 <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
