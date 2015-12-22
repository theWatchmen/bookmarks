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

	var SettingsView = OC.Backbone.View.extend({

		initialize: function() {
			view = this;

			$('#firstrun_setting').click(function () {
				if (!view.$el.hasClass('open')) {
					view.$el.find('.settings-button').click();
				}
			});

			$('#bm_import').change(function(event){
				event.preventDefault();
				view.import(view, $(this).closest('form'));
			});

			$('#bm_export').on('click', view.export);
		},

		export: function() {
			window.location = $(this).attr('href');
		},

		import: function(view, $form) {
			var iframe;
			if ($('#upload_iframe').length === 1)
				iframe = $('#upload_iframe');
			else {
				iframe = $('<iframe></iframe>').attr({
					id: 'upload_iframe',
					name: 'upload_iframe',
					width: '0',
					height: '0',
					border: '0',
					class: 'hidden'
				}).on('load', view.importHandler);
				$form.append(iframe);
			}

			$form.attr({
				target: 'upload_iframe',
				method: 'post',
				enctype: 'multipart/form-data',
				encoding: 'multipart/form-data'
			});

			$form.submit();
		},

		importHandler: function () {
			var $iframe = $(this);
			var data = {};
			try {
				data = $.parseJSON($iframe.contents().text());
			} catch (e) {
			}
			if (!data) {
				OC.Notification.showTemporary(t('bookmark', 'Import error'));
				return;
			}
			if (data.status == 'error') {
				var list = $("<ul></ul>").addClass('setting_error_list');
				console.warn(data);
				$.each(data.data, function (index, item) {
					list.append($("<li></li>").text(item));
				});
				OC.Notification.showTemporary(list, {isHTML: true});
			} else {
				OC.Notification.showTemporary(t('bookmark', 'Import completed successfully.'));
				//FIXME resolve getBookmarks(), empty bookmarkslist first
				getBookmarks();
			}
		}

	});

	OCA.Bookmarks = OCA.Bookmarks || {};
	OCA.Bookmarks.SettingsView = SettingsView;
})();
