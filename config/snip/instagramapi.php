<?php
	$insta_version      = 'v18.0';
	$insta_media_limit  = '12';
	$insta_business_id  = '17841462430190554';
	$insta_access_token = 'EAAEuN73PivcBO4bFHvcU9qpMDASyWZBEXF7XmchNLedaOk5Y0ABAdzhb1AvLfx1r3YOAT7Sb8uFls5CiBhMUbtAKxcWpyM93LZAQWJdRMMupXolcZAZAlfFVuPzWAWlVLG9Xuxomn9rj5ntLCDau6mIlXKMcQyLyY4rkfJmB6Nk2SrZCFkTAADmIoAUzoxSXc';

	$json = file_get_contents("https://graph.facebook.com/{$insta_version}/{$insta_business_id}?fields=name%2Cmedia.limit({$insta_media_limit})%7Bcaption%2Cmedia_url%2Cthumbnail_url%2Cpermalink%2Clike_count%2Ccomments_count%2Cmedia_type%7D&access_token={$insta_access_token}");
	$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
?>