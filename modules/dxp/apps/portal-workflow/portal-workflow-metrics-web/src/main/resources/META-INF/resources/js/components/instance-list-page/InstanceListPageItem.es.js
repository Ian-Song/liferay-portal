/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import React, {useContext} from 'react';

import Icon from '../../shared/components/Icon.es';
import moment from '../../shared/util/moment.es';
import {InstanceListContext} from './store/InstanceListPageStore.es';

const getStatusIcon = status => {
	if (status === 'OnTime') {
		return {
			bgColor: 'bg-success-light',
			iconColor: 'text-success',
			iconName: 'check-circle'
		};
	}

	if (status === 'Overdue') {
		return {
			bgColor: 'bg-danger-light',
			iconColor: 'text-danger',
			iconName: 'exclamation-circle'
		};
	}

	if (status === 'Untracked') {
		return {
			bgColor: 'bg-info-light',
			iconColor: 'text-info',
			iconName: 'hr'
		};
	}

	return null;
};

const InstanceListPageItem = ({
	assetTitle,
	assetType,
	assigneeUsers,
	creatorUser,
	dateCreated,
	id,
	slaStatus,
	status,
	taskNames = []
}) => {
	const completed = status === 'Completed';
	const {setInstanceId} = useContext(InstanceListContext);
	const statusIcon = getStatusIcon(slaStatus);

	const updateInstanceId = () => setInstanceId(id);

	const formattedAssignees = !completed
		? assigneeUsers
			? assigneeUsers.map(assigneeUser => assigneeUser.name).join(', ')
			: Liferay.Language.get('unassigned')
		: Liferay.Language.get('not-available');

	return (
		<tr data-testid="instanceRow">
			<td>
				{statusIcon && (
					<span
						className={`mr-3 sticker sticker-sm ${statusIcon.bgColor}`}
					>
						<span className="inline-item">
							<Icon
								elementClasses={statusIcon.iconColor}
								iconName={statusIcon.iconName}
							/>
						</span>
					</span>
				)}
			</td>

			<td className="lfr-title-column table-title">
				<a
					data-target="#instanceDetailModal"
					data-testid="instanceIdLink"
					data-toggle="modal"
					href="javascript:;"
					onClick={updateInstanceId}
					tabIndex="-1"
				>
					<strong>{id}</strong>
				</a>
			</td>

			<td data-testid="assetInfoCell">{`${assetType}: ${assetTitle}`}</td>

			<td data-testid="taskNamesCell">
				{!completed
					? taskNames.join(', ')
					: Liferay.Language.get('completed')}
			</td>

			<td data-testid="assigneesCell">{formattedAssignees}</td>

			<td data-testid="creatorUserCell">
				{creatorUser ? creatorUser.name : ''}
			</td>

			<td className="pr-4 text-right" data-testid="dateCreatedCell">
				{moment
					.utc(dateCreated)
					.format(Liferay.Language.get('mmm-dd-yyyy-lt'))}
			</td>
		</tr>
	);
};

export default InstanceListPageItem;
