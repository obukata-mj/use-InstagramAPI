<?php
/**
 * ConnectInstagram.js
 * グラフAPIを使用した、Instagramの投稿を埋め込む為のクラス
 * 
 * @repository https://github.com/obukata-mj/use-InstagramAPI
 * 
 * @author obukata
 * @version 1.0.0
 * @license MIT
 */

  include_once "../config/snip/instagram.config.php";
  $json = file_get_contents("https://graph.facebook.com/{$insta_version}/{$insta_business_id}?fields=name%2Cmedia.limit({$insta_media_limit})%7Bcaption%2Cmedia_url%2Cthumbnail_url%2Cpermalink%2Clike_count%2Ccomments_count%2Ctimestamp%2Cmedia_type%7D&access_token={$insta_access_token}");
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  echo $json;
?>