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

	var TagCollection = OC.Backbone.Collection.extend({
		model: OCA.Bookmarks.TagModel,
		url: 'relatedTags',

		getLabels: function () {
			var labels = [];
			_.each(this.models, function(model) {
				this.push(model.get('tag'));
			}, labels);
			return labels;
		}

	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.TagCollection = TagCollection;
})();
