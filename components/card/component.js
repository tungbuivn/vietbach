// const Howler = require('howler');
const Q = require('q');

module.exports = class {
  onCreate() {
    // console.log(Howler);
    this.state = {
      //   sound: null
      count: 0,
      sound: null,
      words: [],
    };
  }

  onMount() {
    // console.log('input ', this.input);
    this.state.words = this.input.title
      .split(' ')
      .map((o, i) => ({ word: o, bg: '', i }));
  }

  loopWords(arrData) {
    const arr = [].concat(arrData);
    const me = this;
    if (arr.length) {
      const w = arr.shift();
      console.log(w, 'xxxxxxxx');
      const org = Object.assign({}, w);
      w.bg = 'hl';
      me.state.words[w.i] = w;
      me.setStateDirty('words');
      setTimeout(() => {
        me.state.words[w.i] = org;
        me.setStateDirty('words');
        me.loopWords(arr);
      }, 300);
    }
  }

  play() {
    const me = this;
    // me.count = 0;
    if (!me.sound) {
      me.state.sound = new Howl({
        src: [this.input.audio],
        autoplay: true,
        usingWebAudio: false,
        html5: true,
      });
    } else {
      me.state.sound.play();
    }
    this.loopWords([].concat(this.state.words));

    // console.log('XXXXXXXXXXXXXXXXX', me.count);
    // if (me.state.count == 1) {

    // }
    // me.state.sound.once("load", () => {
    //   me.state.count = 1;
    //   me.state.sound.play();
    // });
  }
};
