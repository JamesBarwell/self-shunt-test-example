const test = require('node:test');
const assert = require('node:assert');

const Scanner = require('./scanner');

test('test using self-shunt method', () => {
  this.lastItem;

  this.displayItem = function(item) {
    this.lastItem = item;
  }

  const scanner = new Scanner(this);

  scanner.scan();

  assert.equal('new item', this.lastItem);
});


test('test using mock', () => {
  let lastItem;

  const mockDisplay = {
    displayItem: function(item) {
      lastItem = item;
    }
  }

  const scanner = new Scanner(mockDisplay);

  scanner.scan();

  assert.equal('new item', lastItem);
});
