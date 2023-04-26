const {Shop} = require("../src/Shop")
const {Item} = require("../src/Item")

describe("Gilded Rose", function() {
  it("items should have a SellIn value which denotes the number of days we have to sell the item", function() {
    const newItem = new Item("newItem", 10, 0)
    expect(newItem.sellIn).toBe(10);
  });
  it("items should have a Quality value which denotes how valuable the item is", function() {
    const newItem = new Item("newItem", 10, 50)
    expect(newItem.quality).toBe(50);
  });
  it("should lowers sellIn and quality values for every item", function() {
    const newItem1 = new Item("newItem1", 10, 50)
    const newItem2 = new Item("newItem2", 9, 49)
    const gildedRose = new Shop([newItem1, newItem2]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(49);
    expect(items[1].sellIn).toBe(8);
    expect(items[1].quality).toBe(48);
  });
  it("should lower quality twice as fast after the sell by date has passed for every item", function() {
    const newItem1 = new Item("newItem1", 0, 50)
    const newItem2 = new Item("newItem2", 0, 40)
    const gildedRose = new Shop([newItem1, newItem2]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].quality).toBe(48);
    expect(items[1].quality).toBe(38);
  });
  it("should never have quality less than 0", function() {
    const newItem = new Item("newItem", 10, 0)
    const gildedRose = new Shop([newItem]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].quality).toBe(0);
  });
  it("should increase the quality of 'Aged Brie' as it gets older", function() {
    const newItem1 = new Item("Aged Brie", 10, 40)
    const gildedRose = new Shop([newItem1]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].quality).toBe(41);
  });
  it("should never have items with a quality more than 50", function() {
    const newItem1 = new Item("Aged Brie", 10, 50)
    const gildedRose = new Shop([newItem1]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].quality).toBe(50);
  });
  it("should never decrease sellIn or quality of 'Sulfuras, Hand of Ragnaros'", function() {
    const newItem1 = new Item("Sulfuras, Hand of Ragnaros", 10, 80)
    const gildedRose = new Shop([newItem1]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].quality).toBe(80);
  });
  it("should increase the quality of 'Backstage passes' as it gets older", function() {
    const newItem1 = new Item( 'Backstage passes to a TAFKAL80ETC concert', 12, 40)
    const gildedRose = new Shop([newItem1]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].sellIn).toBe(11);
    expect(items[0].quality).toBe(41);
  });
  it("should increase the quality of 'Backstage passes' by 2 when ten days or less ", function() {
    const newItem1 = new Item( 'Backstage passes to a TAFKAL80ETC concert', 10, 40)
    const gildedRose = new Shop([newItem1]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(42);
  });
  it("should increase the quality of 'Backstage passes' by 3 when 5 days or less ", function() {
    const newItem1 = new Item( 'Backstage passes to a TAFKAL80ETC concert', 5, 40)
    const gildedRose = new Shop([newItem1]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(43);
  });
  it("should lowers quality values for 'Conjured' items twice as fast as normal items", function() {
    const newItem1 = new Item("Conjured", 10, 50)
    const newItem2 = new Item("Conjured", 10, 1)
    const newItem3 = new Item("Conjured", 10, 0)
    const gildedRose = new Shop([newItem1, newItem2, newItem3]);
    const items = gildedRose.dailyUpkeep();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(48);
    expect(items[1].sellIn).toBe(9);
    expect(items[1].quality).toBe(0);
    expect(items[2].sellIn).toBe(9);
    expect(items[2].quality).toBe(0);
  });
});
