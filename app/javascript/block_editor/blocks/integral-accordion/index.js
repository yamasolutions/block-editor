import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { PanelBody, ToggleControl } from '@wordpress/components';
import { InnerBlocks, InspectorControls, PlainText } from '@wordpress/block-editor';
import { box as icon } from '@wordpress/icons';

const name = 'integral/foundation-accordion';

export { name };

export const settings = {
	title: 'Accordion (OLD)',
	description:  'Accordions are elements that help you organize and navigate multiple documents in a single container. to help draw attention to content.',
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
    let buttonVisibilityClass = attributes.isOpenByDefault ? "collapsed" : "";
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
  },
  deprecated: [
    {
      attributes: {
        title: {
          source: 'text',
          selector: '.accordion-title'
        },
        isOpenByDefault: {
          type: 'boolean',
          default: true
        }
      },
      save({ attributes }) {
        let activeClass = attributes.isOpenByDefault ? "is-active" : "";

        return (
          <div className="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true">
            <div className= { classnames("accordion-item", activeClass) } data-accordion-item>
              <a href="#" className="accordion-title">{ attributes.title }</a>

              <div className="accordion-content" data-tab-content>
                <InnerBlocks.Content />
              </div>
            </div>
          </div>
        );
      }
    },
    {
      attributes: {
        title: {
          source: 'text',
          selector: '.accordion-title'
        },
        isOpenByDefault: {
          type: 'boolean',
          default: true
        }
      },
      save({ attributes }) {
        let activeClass = attributes.isOpenByDefault ? "is-active" : "";

        return (
          <ul className="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true">
            <li className= { classnames("accordion-item", activeClass) } data-accordion-item>
              <a href="#" className="accordion-title">{ attributes.title }</a>

              <div className="accordion-content" data-tab-content>
                <InnerBlocks.Content />
              </div>
            </li>
          </ul>
        );
      }
    }
  ]
};

