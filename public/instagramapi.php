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

  /**
   * .env環境変数からビジネスID、アクセストークンを取得
   */
  $envFilePath = '../.env';
  if (file_exists($envFilePath)) {
    $envFile = file_get_contents($envFilePath);
    $lines = explode("\n", $envFile);
    foreach ($lines as $line) {
      if (empty($line) || strpos($line, '#') === 0) {
        continue;
      }
      list($key, $value) = explode('=', $line, 2);
      putenv("$key=$value");
    }
  } else {
    echo '.env ファイルが見つかりません。';
  }

  $insta_version      = 'v18.0';
  $insta_business_id = getenv('INSTAGRAM_BUSINESS_ID');
  $insta_access_token = getenv('INSTAGRAM_ACCESS_TOKEN');
  $insta_media_limit  = 30;

  $json = file_get_contents("https://graph.facebook.com/{$insta_version}/{$insta_business_id}?fields=name%2Cmedia.limit({$insta_media_limit})%7Bcaption%2Cmedia_url%2Cthumbnail_url%2Cpermalink%2Clike_count%2Ccomments_count%2Ctimestamp%2Cmedia_type%7D&access_token={$insta_access_token}");
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  echo $json;
?>