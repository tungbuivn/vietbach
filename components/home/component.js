const share = require('../share');

module.exports = class {
  onCreate() {
    this.state = {
      list: [
        {
          title: 'Hoa quả',
          img: '/images/quacam.png',
          href: '/list/thucvat'
        },
        {
          title: 'Động vật',
          img: '/images/conmeo.png',
          href: '/list/dongvat'
        },
        {
          title: 'Con số',
          img: '/images/cacconso.png',
          href: '/list/conso'
        }
      ]
    };
  }

  onMount() {
    share.title.next('Home');
  }
};
