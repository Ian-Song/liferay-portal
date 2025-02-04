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

package com.liferay.talend.runtime;

import com.liferay.talend.runtime.writer.LiferayWriteOperation;
import com.liferay.talend.tliferayoutput.TLiferayOutputProperties;

import org.talend.components.api.component.runtime.Sink;
import org.talend.components.api.component.runtime.WriteOperation;
import org.talend.components.api.container.RuntimeContainer;
import org.talend.daikon.i18n.GlobalI18N;
import org.talend.daikon.i18n.I18nMessageProvider;
import org.talend.daikon.i18n.I18nMessages;
import org.talend.daikon.properties.ValidationResult;

/**
 * @author Zoltán Takács
 */
public class LiferaySink extends LiferaySourceOrSink implements Sink {

	@Override
	public WriteOperation<?> createWriteOperation() {
		return new LiferayWriteOperation(this, _tLiferayOutputProperties);
	}

	@Override
	public ValidationResult validate(RuntimeContainer runtimeContainer) {
		ValidationResult validationResult = super.validate(runtimeContainer);

		if (validationResult.getStatus() == ValidationResult.Result.ERROR) {
			return validationResult;
		}

		Object componentData = runtimeContainer.getComponentData(
			runtimeContainer.getCurrentComponentId(),
			"COMPONENT_RUNTIME_PROPERTIES");

		if (!(componentData instanceof TLiferayOutputProperties)) {
			return new ValidationResult(
				ValidationResult.Result.ERROR,
				String.format(
					"Unable to locate %s in given runtime container",
					TLiferayOutputProperties.class));
		}

		_tLiferayOutputProperties = (TLiferayOutputProperties)componentData;

		System.out.println(
			"(LiferaySink - 1) TEST new method gains same result: " +
				(_tLiferayOutputProperties.connection ==
					getLiferayConnectionProperties()));
		System.out.println(
			"(LiferaySink - 2) TEST new method gains same result: " +
				(_tLiferayOutputProperties.resource.connection ==
					getLiferayConnectionProperties()));

		_tLiferayOutputProperties.connection = getLiferayConnectionProperties();
		_tLiferayOutputProperties.resource.connection =
			getLiferayConnectionProperties();

		return validationResult;
	}

	protected static final I18nMessages i18nMessages;

	static {
		I18nMessageProvider i18nMessageProvider =
			GlobalI18N.getI18nMessageProvider();

		i18nMessages = i18nMessageProvider.getI18nMessages(LiferaySink.class);
	}

	private TLiferayOutputProperties _tLiferayOutputProperties;

}