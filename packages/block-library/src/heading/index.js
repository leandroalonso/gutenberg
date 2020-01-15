/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Heading' ),
	description: __( 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.' ),
	icon: 'heading',
	keywords: [ __( 'title' ), __( 'subtitle' ) ],
	supports: {
		className: false,
		anchor: true,
		__unstablePasteTextInline: true,
	},
	example: {
		attributes: {
			content: __( 'Code is Poetry' ),
			level: 2,
		},
	},
	__experimentalGetAccessibilityLabel( { content, level } ) {
		if ( isEmpty( content ) ) {
			return sprintf(
				/* translators: accessibility text. %s: heading level. */
				__( 'Level %s. Empty.' ),
				level
			);
		}

		return sprintf(
			/* translators: accessibility text. 1: heading level. 2: heading content. */
			__( 'Level %1$s. %2$s' ),
			level,
			content
		);
	},
	transforms,
	deprecated,
	merge( attributes, attributesToMerge ) {
		return {
			content: ( attributes.content || '' ) + ( attributesToMerge.content || '' ),
		};
	},
	edit,
	save,
};
