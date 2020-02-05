const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
let siteUrl, siteIndex, siteLogo
let siteObj = {}

// 存储数据
const mySites = localStorage.getItem('mySites')
const initSites = JSON.parse(mySites)
const hashMap = initSites || [
  {
    url: 'https://www.acfun.cn',
    logo: 'A'
  },
  {
    url: 'https://www.bilibili.com',
    logo: 'B'
  }
]

// 渲染
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((obj, i) => {
    const $li = $(`<a href="${obj.url}">
      <li class="site">
        <div class="logo">${obj.logo}</div>
        <div class="link">${obj.url}</div>
      </li>
    </a>`)
    $li.insertBefore($lastLi)
  })
}

render()

// 新增网页
$('.addButton').on('click', () => {
  let url = window.prompt('请输入网址')
  if (url.indexOf('https://') === -1) {
    url = `https://${url}`
  }
  let logo = url[8].toUpperCase()
  siteObj.url = url
  siteObj.logo = logo
  // console.log(siteObj)
  hashMap.push(siteObj)
  // console.log(hashMap)
  render()
})

// 保存
window.onbeforeunload = () => {
  localStorage.setItem('mySites', JSON.stringify(hashMap))
}