/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import ClayIcon from '@clayui/icon';
import PropTypes from 'prop-types';
import React from 'react';
import {useDrag} from 'react-dnd';

import {LAYOUT_DATA_ITEM_TYPES} from '../../../app/config/constants/layoutDataItemTypes';

export default function Widget(props) {
	const [, drag] = useDrag({
		end(_item, _monitor) {
			// TODO: call server to get itemId and notify app
		},
		item: {type: LAYOUT_DATA_ITEM_TYPES.fragment}
	});

	return (
		<button
			className="btn btn-sm btn-unstyled d-block mb-1 px-2 py-1"
			disabled={props.used && !props.instanceable}
			ref={drag}
			type="button"
		>
			<ClayIcon
				className="mr-2"
				symbol={props.instanceable ? 'grid' : 'live'}
			/>
			<span>{props.title}</span>
		</button>
	);
}

Widget.propTypes = {
	instanceable: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	used: PropTypes.bool.isRequired
};
