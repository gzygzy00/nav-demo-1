const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');

// 存储数据
const mySites = localStorage.getItem('mySites');
const initSites = JSON.parse(mySites);
const hashMap = initSites || [
  // {
  //   url: 'https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=groupmessage&isappinstalled=0',
  //   logo: '丁'
  // },
  // {
  //   url: 'http://www.people.com.cn/',
  //   logo: '人'
  // },
  // {
  //   url: 'http://www.bilibili.com/',
  //   logo: 'B'
  // }
  {
    url: 'https://gzygzy00.github.io/',
    logo: 'B'
  },
  {
    url: 'https://gzygzy00.github.io/cnode-imitated/dist/#/',
    logo: 'C'
  },
  {
    url: 'https://gzygzy00.github.io/DrawCUPHEAD/dist/index.html',
    logo: 'D'
  },
];

// 正则
const simplify = (str) => {
  if (str === 'https://gzygzy00.github.io/') {
    return '个人博客';
  } else if (str.indexOf('https://gzygzy00.github.io/') >= 0 && str !== 'https://gzygzy00.github.io/') {
    return str.replace('https://gzygzy00.github.io/', '')
      .replace(/\/dist\/.*$/, '')
  }else{
    return str.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/(\/.*)|(^\.)/, '') // 删除 / 开头和开头是 . 的内容
      .replace(/\.?(?<=\.).*$/, ''); // 删除域名第一个 . 之后的内容
  }
};

// 渲染
const render = () => {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach((obj, i) => {
    const $li = $(`<li class="site" title="${obj.url}">
        <div class="logo">${obj.logo}</div>
        <div class="link">${simplify(obj.url)}</div>
        <div class="icon-wrapper">
          <svg class="icon close">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </li>`);
    $li.insertBefore($lastLi);
    $li.on('click', () => {
      window.open(obj.url);
    });
    $li.on('click', '.close', (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(i, 1);
      render();
    });
  });
};
render();

// 新增网页
$('.site.last').on('click', () => {
  let url = window.prompt('请输入网址');
  if (url.indexOf('https://') === -1) {
    url = `https://${url}`;
  }
  console.log(url);
  console.log(hashMap);
  hashMap.push({
    url: url,
    logo: simplify(url)[0].toUpperCase()
  });
  // console.log(hashMap)
  render();
  window.scrollTo(0, 99999);
});

// 保存，刷新或关闭时
window.onbeforeunload = () => {
  localStorage.setItem('mySites', JSON.stringify(hashMap));
};