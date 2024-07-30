module.exports = class Scanner {
  constructor(display) {
    this.display = display;
  }

  scan() {
    // pretend to scan an item
    const item = 'new item';

    this.display.displayItem(item);
  }
}
