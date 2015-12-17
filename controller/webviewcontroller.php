<?php

/**
 * ownCloud - bookmarks
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Stefan Klemm <mail@stefan-klemm.de>
 * @copyright Stefan Klemm 2014
 */

namespace OCA\Bookmarks\Controller;

use OCP\AppFramework\Http\ContentSecurityPolicy;
use \OCP\IRequest;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\AppFramework\Controller;
use \OCP\IDb;
use \OCA\Bookmarks\Controller\Lib\Bookmarks;

class WebViewController extends Controller {

	private $userId;
	private $urlgenerator;
	private $db;

	public function __construct($appName, IRequest $request, $userId, $urlgenerator, IDb $db) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->urlgenerator = $urlgenerator;
		$this->db = $db;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index() {
		$bookmarkleturl = $this->urlgenerator->getAbsoluteURL('index.php/apps/bookmarks/bookmarklet');
		$navigationEntries = $this->getNavigationEntries();

		$params = array(
			'bookmarkleturl'   => $bookmarkleturl,
			'navigationEntries' => $navigationEntries,
		);

		$policy = new ContentSecurityPolicy();
		$policy->addAllowedFrameDomain("'self'");

		$response = new TemplateResponse('bookmarks', 'main', $params);
		$response->setContentSecurityPolicy($policy);

		return $response;
	}

	protected function getNavigationEntries() {
		$l = \OC::$server->getL10N('files');
		$entries = [];
		$entries[] = [
			'id' => 'all',
			'name' => (string) $l->t('All Bookmarks'),
			'class' => 'navigationAllBookmarks'
			//'url' => \OC::$server->getURLGenerator()->linkToRoute('bookmarks.bookmark.get_bookmarks'),
		];
		return $entries;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function bookmarklet($url = "", $title = "") {
		$bookmarkExists = Bookmarks::bookmarkExists($url, $this->userId, $this->db);
		$description = "";
        $tags = [];
		if ($bookmarkExists !== false){
			$bookmark = Bookmarks::findUniqueBookmark($bookmarkExists, $this->userId, $this->db);
			$description = $bookmark['description'];
            $tags = $bookmark['tags'];
		}
		$params = array(
            'url'           => $url,
            'title'         => $title,
            'description'   => $description,
            'bookmarkExists'=> $bookmarkExists,
            'tags'          => $tags
        );
		return new TemplateResponse('bookmarks', 'addBookmarklet', $params);  // templates/main.php
	}

}
