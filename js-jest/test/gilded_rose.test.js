const {Shop} = require("../src/Shop")
const {Item} = require("../src/Item")

describe("Gilded Rose", function() {
  let itemArr = [];

  beforeEach(() => {
    itemArr = [];
    for (let i = 0; i < 10; i++) {
      itemArr.push(new Item(`newItem${i}`, 10, 50, -1, -1))
    }
  });

  it("items should have a sellBy value which denotes the number of days we have to sell the item", function() {
    itemArr.forEach(item => {
      expect(item.sellBy).toBe(10);
    })
  });

  it("items should have a Quality value which denotes how valuable the item is", function() {
    itemArr.forEach(item => {
      expect(item.quality).toBe(50);
    })
  });

  it("should lower sellBy and quality values for every item", function() {
    const gildedRose = new Shop(itemArr);

    const items = gildedRose.dailyUpkeepOfEachItem();

    items.forEach(item => {
      expect(item.sellBy).toBe(9);
      expect(item.quality).toBe(49);
    })
  });

  it("should lower quality twice as fast after the sell by date has passed for every item", function() {
    const gildedRose = new Shop(itemArr);

    for (let i = 0; i < 10; i++) {
      gildedRose.dailyUpkeepOfEachItem()
    }
    const items = gildedRose.dailyUpkeepOfEachItem();

    items.forEach(item => {
      expect(item.quality).toBe(38);
    })
  });

  it("should never have quality less than 0", function() {
    const gildedRose = new Shop(itemArr);

    for (let i = 0; i < 60; i++) {
      gildedRose.dailyUpkeepOfEachItem()
    }
    const items = gildedRose.dailyUpkeepOfEachItem();

    items.forEach(item => {
      expect(item.quality).toBe(0);
    })
  });

  it("should increase the quality of 'Aged Brie' as it gets older", function() {
    const newItem1 = new Item("Aged Brie", 10, 40, -1, 1)
    const gildedRose = new Shop([newItem1]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(41);
  });

  it("should never have items with a quality more than 50", function() {
    const newItem = new Item("Aged Brie", 10, 50, -1, 1)
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(50);
  });

  it("should never decrease sellBy or quality of 'Sulfuras, Hand of Ragnaros'", function() {
    const newItem = new Item("Sulfuras, Hand of Ragnaros", 10, 80, 0, 0)
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(80);
  });

  it("should increase the quality of 'Backstage passes' as it gets older", function() {
    const newItem = new Item( 'Backstage passes to a TAFKAL80ETC concert', 12, 40, -1, 1)
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(41);
  });

  it("should increase the quality of 'Backstage passes' by 2 when ten days or less ", function() {
    const newItem = new Item( 'Backstage passes to a TAFKAL80ETC concert', 10, 49, -1, 1)
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(50);
  });

  it("should increase the quality of 'Backstage passes' by 3 when 5 days or less ", function() {
    const newItem = new Item( 'Backstage passes to a TAFKAL80ETC concert', 5, 40, -1, 1)
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(43);
  });

  it("should lower quality values for 'Conjured' items twice as fast as normal items", function() {
    const newItem = new Item("Conjured", 10, 50, -1, -2);
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(48);
  });

  it("should lowers quality values for 'Conjured' items to 0 if qaulity is 1", function() {
    const newItem = new Item("Conjured", 10, 1, -1, -2)
    const gildedRose = new Shop([newItem]);

    const items = gildedRose.dailyUpkeepOfEachItem();

    expect(items[0].quality).toBe(0);
  });
});
