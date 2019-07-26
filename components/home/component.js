module.exports = class {
  onCreate() {
    const lst = [
      {
        key: 'quaroi',
        title: 'Quả roi',
      },
      {
        key: 'quabo',
        title: 'Quả bơ',
      },
      {
        key: 'quabuoi',
        title: 'Quả bưởi',
      },
      {
        key: 'quachanh',
        title: 'Quả chanh',
      },
      {
        key: 'quakhe',
        title: 'Quả khế',
      },
      {
        key: 'quachomchom',
        title: 'Quả chôm chôm',
      },
      {
        key: 'quamit',
        title: 'Quả mít',
      },
      {
        key: 'quadudu',
        title: 'Quả đu đủ',
      },
      {
        key: 'quaduahau',
        title: 'Quả dưa hấu',
      },
      {
        key: 'quathanhlong',
        title: 'Quả thanh long',
      },
      {
        key: 'quacam',
        title: 'Quả cam',
      },
      {
        key: 'quadua',
        title: 'Quả dứa',
      },
      {
        key: 'qualuu',
        title: 'Quả lựu',
      },
      {
        key: 'quamangcut',
        title: 'Quả măng cụt',
      },
      {
        key: 'quana',
        title: 'Quả na',
      },
      {
        key: 'quanho',
        title: 'Quả nho',
      },
    ];
    this.state = {
      list: lst.map((o) => {
        const c = Object.assign({}, o);
        c.audio = `sounds/${o.key}.mp3`;
        c.img = `images/${o.key}.png`;
        return c;
      }),
    };
    // console.log('create');
  }

  onMount() {
    // console.log('qua roi');
  }

  update(a, e, v) {
    console.log(a, e, v);
    // a.stopPropagation();
    // e.preventDefault();
    console.log(e.value);
  }
};
