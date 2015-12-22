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

	var BookmarkModel = OC.Backbone.Model.extend({
		idAttribute: 'id',

		defaults: {
			description: '',
			from_own: 0,
			title: '',
			item: {tags: ''}
		},

		url: 'bookmark'
	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.BookmarkModel = BookmarkModel;
})();
