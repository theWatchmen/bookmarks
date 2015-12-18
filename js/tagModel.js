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
		idAttribute: 'id',
		defaults: {
			label: '',
			numberOfBookmarks: 0
		},

		setLabel: function(label) {
			this.set({label: label});
		},

		setNumberOfBookmarks: function(nob) {
			this.set({numberOfBookmarks: nob});
		}

	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.TagModel = TagModel;
})();
