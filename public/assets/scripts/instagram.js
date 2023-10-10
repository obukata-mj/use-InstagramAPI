document.addEventListener('DOMContentLoaded', ()=>{
  async function instaAPI(){
    const access_token = 'EAAEuN73PivcBO4bFHvcU9qpMDASyWZBEXF7XmchNLedaOk5Y0ABAdzhb1AvLfx1r3YOAT7Sb8uFls5CiBhMUbtAKxcWpyM93LZAQWJdRMMupXolcZAZAlfFVuPzWAWlVLG9Xuxomn9rj5ntLCDau6mIlXKMcQyLyY4rkfJmB6Nk2SrZCFkTAADmIoAUzoxSXc'
    const instagram_business_account_id = '17841462430190554'
    const viewPostsLength =  12
    document.querySelector('#insta').insertAdjacentHTML('beforeend', '<div class="embed-instagram"></div>')
    const response = await fetch(`https://graph.facebook.com/v18.0/${instagram_business_account_id}?fields=name,media.limit(${viewPostsLength}){caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type}&access_token=${access_token}`)
    if(response.status === 200){
      const resObjects = await response.json()
      delete(resObjects.media.paging)
      Object.entries(resObjects.media).forEach(instaItems => {
        instaItems[1].forEach(eachItem => {
          let mediaicon
          if(eachItem.media_url !== null){
            if(eachItem.media_type === 'VIDEO') {
              eachItem.media = eachItem.thumbnail_url
              mediaicon = '<iconify-icon icon="fluent:video-clip-16-filled"></iconify-icon>'
            }else if(eachItem.media_type === 'CAROUSEL_ALBUM') {
              eachItem.media = eachItem.media_url
              mediaicon = '<iconify-icon icon="tabler:box-multiple"></iconify-icon>'
            }else {
              eachItem.media = eachItem.media_url
              mediaicon = ''
            }
            const caption = eachItem.caption ? `<span class="embed-instagram__caption">${eachItem.caption}</span>` : ''
            const like = `<span class="embed-instagram__like"><iconify-icon icon="icon-park-solid:like"></iconify-icon>${eachItem.like_count}</span>`
            document.querySelector('#insta .embed-instagram').insertAdjacentHTML('beforeend', `
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
    } else {
      const resObjects = await response.json()
      document.querySelector('#insta').insertAdjacentHTML('beforeend',`
        <div class="embed-instagram__load-error">
          <iconify-icon icon="material-symbols:error-outline"></iconify-icon>
          <p>読み込めませんでした</p>
        </div>
      `)
      console.error(`embedInstagram Error: ${resObjects.error.message}`)
    }
  }
  instaAPI()
})
