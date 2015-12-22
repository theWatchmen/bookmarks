/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function() {

	var TagModel = OC.Backbone.Model.extend({
		idAttribute: 'id'
	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.TagModel = TagModel;
})();
