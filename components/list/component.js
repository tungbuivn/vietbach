const share = require('../share');

module.exports = class {
  onCreate() {
    this.state = {
      list: [],
    };
    // console.log('create');
  }

  onMount() {
    const path = new URL(global.location.href).pathname.split('/');
    share.getData(path[2]).then((lst) => {
      console.log(lst, 'xxxxxxxxxx');
      this.state.list = lst.map((o) => {
        const c = Object.assign({}, o);
        c.audio = `sounds/${o.key}.mp3`;
        c.img = `images/${o.key}.png`;
        return c;
      });
    });

    // console.log('qua roi');
  }

  update(a, e, v) {
    console.log(a, e, v);
    // a.stopPropagation();
    // e.preventDefault();
    console.log(e.value);
  }
};
