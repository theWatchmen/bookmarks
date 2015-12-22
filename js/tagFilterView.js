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

	var TagFilterView = OC.Backbone.View.extend({

		initialize: function(options) {
			var view = this;

			this.collection.on('add remove', function() { view.render() });

			$('#tag_filter input').tagit({
				allowSpaces: true
			});
		},

		render: function() {
			console.warn('RUNNING');
			$('#tag_filter input').tagit({
				allowSpaces: true,
				availableTags: this.collection.getLabels(),
				onTagFinishRemoved: filterTagsChanged,
				placeholderText: t('bookmarks', 'Filter by tag')
			}).tagit('option', 'onTagAdded', filterTagsChanged);
		}
	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.TagFilterView = TagFilterView;
})();
