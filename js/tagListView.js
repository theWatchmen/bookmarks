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

	var TagListView = OC.Backbone.View.extend({
		/** @type {string} **/
		tagName: 'li',

		initialize: function(options) {
			var view = this;
			this.model.on('change:tags', function() { view.render() });
		},

		render: function() {
			this.$el.empty();

		}
	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.TagListView = TagListView;
})();
