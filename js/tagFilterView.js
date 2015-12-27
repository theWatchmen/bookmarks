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
			_.bindAll(this, 'reset');
			var view = this;

			this.collection.on('add remove', function() { view.render() });

			this.$el.tagit({
				allowSpaces: true
			});

			$('.navigationAllBookmarks').on('click', this.reset);
		},

		render: function() {
			console.warn('RUNNING');
			this.$el.tagit({
				allowSpaces: true,
				availableTags: this.collection.getLabels(),
				onTagFinishRemoved: filterTagsChanged,
				placeholderText: t('bookmarks', 'Filter by tag')
			}).tagit('option', 'onTagAdded', filterTagsChanged);
		},

		reset: function() {
			this.$el.tagit('removeAll');
		}
	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.TagFilterView = TagFilterView;
})();
