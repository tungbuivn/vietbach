module.exports = class {
  onCreate() {
    this.state = {
      list: [],
    };
    // console.log('create');
  }

  onMount() {
    // console.log('qua roi');
    this.state.list = this.input.list.map((o) => {
      const c = Object.assign({}, o);
      c.audio = `sounds/${o.key}.mp3`;
      c.img = `images/${o.key}.png`;
      return c;
    });
  }

  update(a, e, v) {
    console.log(a, e, v);
    // a.stopPropagation();
    // e.preventDefault();
    console.log(e.value);
  }
};
