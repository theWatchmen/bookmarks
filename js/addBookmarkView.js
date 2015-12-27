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

	var AddBookmarkView = OC.Backbone.View.extend({

		initialize: function() {
			_.bindAll(this, 'onAddBookmark', 'updateAddButtonState', 'onAddBookmarkError');

			view = this;

			this.$el.find('#add_url').on('keydown keyup change click', view.updateAddButtonState);
			this.updateAddButtonState();
		},

		updateAddButtonState: function() {
			var button = this.$el.find('#bookmark_add_submit');
			this.$el.off('submit');
			if(!this.$el.find('#add_url').val().trim()) {
				this.$el.on('submit', function (e) {
					e.preventDefault();
				});
				button.addClass('disabled');
			}
			else {
				button.removeClass('disabled');
				this.$el.on('submit', this.onAddBookmark);
			}
		},

		onAddBookmark: function(event) {
			event.preventDefault();
			var url = this.$el.find('#add_url').val();
			if (!url.trim()) {
				return;
			}
			var bookmark = new OCA.Bookmarks.BookmarkModel({url: url});
			bookmark.once('sync', this.onAddBookmarkSuccessful, this);
			this.$el.find('#bookmark_add_submit').addClass('icon-loading-small');
			this.$el.find('#bookmark_add_submit').removeClass('icon-add');
			bookmark.save(null, {
				error:   this.onAddBookmarkError
			});

		},

		/**
		 * This is called when the save operation on a bookmark is done, no
		 * matter the outcome
		 *
		 * @this {OCA.Bookmarks.AddBookmarkView}
		 */
		onAddBookmarkSuccessful: function(model, response, options) {
			//FIXME: introduce BookmarksCollection and it this model thereto
			// also introduce BookmarksListView which should update the list
			$('.bookmark_single').filterAttr('data-id', response.item.id).remove();
			updateBookmarksList(response.item, 'prepend');
			this.$el.find('#add_url').val('');
			checkEmpty();

			this.resetElements();
		},

		onAddBookmarkError: function() {
			OC.Notification.showTemporary(t('bookmark', 'Error when saving bookmark – sorry!'));

			this.resetElements();
		},

		resetElements: function() {
			this.$el.find('#bookmark_add_submit').addClass('icon-add');
			this.$el.find('#bookmark_add_submit').removeClass('icon-loading-small');
			this.updateAddButtonState();
		}


	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.AddBookmarkView = AddBookmarkView;
})();
