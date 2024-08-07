/**
 * ConnectInstagram.js
 * グラフAPIを使用した、Instagramの投稿を埋め込む為のクラス
 *
 * @description
 *  本ファイルとは別に以下ファイルが必要です。
 *  - APIのリクエストを行うPHPファイル（ドキュメントルート内）
 *  - アクセストークンやビジネスIDなどのコンフィグファイル（ドキュメントルート外）
 *
 * @repository https://github.com/obukata-mj/use-InstagramAPI
 *
 * @author obukata
 * @version 1.0.0
 * @license MIT
 */

class ConnectInstagram {

  /**
   * @constructor
   * @param { Object } obj - 設定オブジェクトです。
   * @param { filePath } phpRequest - APIのリクエストを行うPHPファイルへのファイルパスです。
   * @param { HTMLElement } target - 投稿を埋め込む対象のHTML要素です。
   * @param { string } postData - 埋め込みのタイプ（'tile'または'list'）です。
   * @param { number } postView - 表示する最大投稿数です。（※PHP設定ファイル側に、APIへのリクエスト制限の数が別途存在します）
   */
  constructor(obj) {
    this.phpRequest = '/instagramapi.php'
    this.target = obj.target
    this.type = obj.type
    this.postView = obj.postView
    this.postData

    this.#ajaxRequest()
  }

  /**
   * Instagramの投稿データを取得するためのAJAXリクエストを行います。
   * @private
   */
  #ajaxRequest() {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.postData = JSON.parse(xhr.responseText)
        this.#checkType()
      }
    }
    xhr.open("GET", this.phpRequest, true)
    xhr.send()
  }

  /**
   * タイプに基づいてレンダリングメソッドを切り替えます。
   * @private
   */
  #checkType() {
    switch(this.type) {
      case 'tile':
        this.#embedTile()
        break;
      case 'list':
        this.#embedList()
        break;
      default:
        this.#embedTile()
    }
  }

  /**
   * サムネイル付きのタイルレイアウトでレンダリングします。
   * @private
   */
  #embedTile() {
    this.target.insertAdjacentHTML('beforeend', '<div class="embed-instagram"></div>')
    delete(this.postData.media.paging)
    Object.entries(this.postData.media).forEach(instaItems => {
      instaItems[1].forEach((eachItem, index) => {
        if(this.postView <= index) return false
        let mediaicon
        if(eachItem.media_url !== null){
          if(eachItem.media_type === 'VIDEO') {
            eachItem.media = eachItem.thumbnail_url
            mediaicon = '<span class="embed-instagram__icon" data-icon="video"></span>'
          }else if(eachItem.media_type === 'CAROUSEL_ALBUM') {
            eachItem.media = eachItem.media_url
            mediaicon = '<span class="embed-instagram__icon" data-icon="multiple"></span>'
          }else {
            eachItem.media = eachItem.media_url
            mediaicon = ''
          }
          const caption = eachItem.caption ? `<span class="embed-instagram__caption">${eachItem.caption}</span>` : ''
          const like = `<span class="embed-instagram__like"><span class="embed-instagram__icon" data-icon="like"></span>${eachItem.like_count}</span>`
          this.target.querySelector('.embed-instagram').insertAdjacentHTML('beforeend', `
            <div class="embed-instagram__item">
              <a class="embed-instagram__link" href="${eachItem.permalink}" target="_blank" rel="noopener">
                <img src="${eachItem.media}">
                <span class="embed-instagram__mediaicon">${mediaicon}</span>
                <span class="embed-instagram__detail">
                  ${caption}
                  ${like}
                </span>
              </a>
            </div>
          `)
        }
      })
    })
  }

  /**
   * サムネイル無しのリストレイアウトでレンダリングします。
   * @private
   */
  #embedList() {
    this.target.insertAdjacentHTML('beforeend', '<div class="embed-list"></div>')
    delete(this.postData.media.paging)
    Object.entries(this.postData.media).forEach(instaItems => {
      instaItems[1].forEach((eachItem, index) => {
        if(this.postView <= index) return false
        if(eachItem.media_url !== null){
          document.querySelector('#embed-list .embed-list').insertAdjacentHTML('beforeend', `
            <div class="">
              <a class="py-2 block hover:text-blue-500" href="${eachItem.permalink}" target="_blank" rel="noopener">
                <span class="block text-gray-700 text-sm">${dayjs(eachItem.timestamp).format('YYYY年M月D日')}</span>
                <span class="block line-clamp-1">${eachItem.caption ? eachItem.caption : 'タイトルがありません'}</span>
              </a>
            </div>
          `)
        }
      })
    })
  }
}
