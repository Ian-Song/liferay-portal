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

import classNames from 'classnames';
import React, {useContext} from 'react';
import {useDrag} from 'react-dnd';

import addItem from '../../../app/actions/addItem';
import {LAYOUT_DATA_ITEM_TYPES} from '../../../app/config/constants/layoutDataItemTypes';
import {DispatchContext} from '../../../app/reducers/index';
import Collapse from '../../../common/components/Collapse';

const layoutElements = [
	{
		columns: ['12'],
		label: Liferay.Language.get('container')
	},
	{
		columns: ['4', '4', '4'],
		label: Liferay.Language.get('columns')
	}
];

const LayoutElementCard = ({label, layoutColumns}) => {
	const dispatch = useContext(DispatchContext);

	const [, drag] = useDrag({
		end(item, monitor) {
			// TODO: Figure out what should go in this config object
			const config = {};

			const {parentId, position} = monitor.getDropResult();

			const itemId = `layout-${Date.now()}`;
			const itemType = item.type;

			dispatch(
				addItem({
					config,
					itemId,
					itemType,
					parentId,
					position
				})
			);
		},
		item: {
			type: LAYOUT_DATA_ITEM_TYPES.container
		}
	});

	return (
		<button
			aria-label={label}
			className={classNames(
				'page-editor__fragments__layout-element-card-preview',
				'card',
				'card-interactive',
				'card-interactive-secondary',
				'selector-button'
			)}
			ref={drag}
			type="button"
		>
			<div className="card-body px-2 py-3" role="image">
				<div className="container p-0">
					<div className="row">
						{layoutColumns.map((column, index) => (
							<div
								className={`col col-${column}`}
								key={`${index}-${column}`}
							></div>
						))}
					</div>
				</div>
				<div className="card-title pt-3 text-truncate" title={label}>
					{label}
				</div>
			</div>
		</button>
	);
};

export default function LayoutElements() {
	return (
		<>
			<Collapse
				label={Liferay.Language.get('layout-elements')}
				open={false}
			>
				<div className="d-flex flex-wrap justify-content-between">
					{layoutElements.map(layoutElement => {
						return (
							<LayoutElementCard
								key={layoutElement.columns.join()}
								label={layoutElement.label}
								layoutColumns={layoutElement.columns}
							/>
						);
					})}
				</div>
			</Collapse>
		</>
	);
}
