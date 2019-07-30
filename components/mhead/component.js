const share = require('../share');

module.exports = class {
  onCreate() {
    this.state = {
      defHead: 'mdl-layout mdl-js-layout  mdl-layout--fixed-header',
      headCls: 'mdl-layout mdl-js-layout  mdl-layout--fixed-header',
      title: ''
    };
    this.state.headCls = this.state.defHead;
  }

  onMount() {
    share.toggleDrawer.subscribe((x) => {
      let cls = '';
      if (x) {
        cls = ' mdl-layout--fixed-drawer';
      }
      this.state.headCls = this.state.defHead + cls;
    });
    share.title.subscribe((title) => {
      this.state.title = title;
    });
  }
};
