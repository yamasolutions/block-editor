import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { PanelBody, ToggleControl } from '@wordpress/components';
import { InnerBlocks, InspectorControls, PlainText } from '@wordpress/block-editor'

const name = 'be/accordion';

export { name };

export const settings = {
	title: 'Accordion',
	description:  'Accordions are elements that help you organize and navigate multiple documents in a single container. to help draw attention to content.',
  icon: 'list-view',
  category: 'layout',
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
  edit({attributes, className, setAttributes, isSelected}) {
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
      <div className={ 'accordion ' + className }>
        <div className='accordion-item'>
          <div className='accordion-title'>
            <PlainText
              onChange={ content => setAttributes({ title: content }) }
              value={ attributes.title }
              placeholder="Your accordion title"
              // className="accordion-title"
            />
          </div>
          <div className="accordion-content" style={ inlineStyle }>
            <InnerBlocks/>
          </div>
        </div>
      </div>
    ];
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
};

// <div class="accordion" id="accordionExample">
//   <div class="accordion-item">
//     <h2 class="accordion-header" id="headingOne">
//       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//         Accordion Item #1
//       </button>
//     </h2>
//     <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
//       <div class="accordion-body">
//         <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
//       </div>
//     </div>
//   </div>
// </div>
