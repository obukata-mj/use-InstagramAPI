document.addEventListener('DOMContentLoaded', ()=>{
  function instaAPI() {
    document.querySelector('#insta').insertAdjacentHTML('beforeend', '<div class="embed-instagram"></div>')
    delete(obj.media.paging)
    Object.entries(obj.media).forEach(instaItems => {
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
  }
  instaAPI()
})
