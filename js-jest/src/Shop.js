
class Shop {
  constructor(items = []) {
    this.items = items;
  }

  modifyItemProperty(item, increment, property) {
    item[property] += increment
  }

  calculateAgedBrie(item, increment) {
    if (item.name === 'Aged Brie') increment = 1;
    if (item.name === 'Aged Brie' && item.quality === 50) increment = 0;
    return increment
  }

  calculateBackstage(item, increment) {
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') increment = 1;
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert' && item.sellIn <= 10) increment = 2;
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert' && item.sellIn <= 5) increment = 3;
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert' && item.quality === 50) increment = 0;
    return increment
  }

  calculateConjured(item, increment) {
    if (item.name === 'Conjured') increment = -2
    if (item.name === 'Conjured' && item.quality === 1) increment = -1
    if (item.name === 'Conjured' && item.quality === 0) increment = 0
    return increment
  }

  dailyUpkeep() {
    let sellInIncrement = -1;
    let qualityIncrement = -1;
    this.items.forEach(item => {
      if (item.quality === 0) qualityIncrement = 0;
      if (item.quality === 50) qualityIncrement = -1;
      qualityIncrement = this.calculateAgedBrie(item, qualityIncrement);
      if (item.sellIn <= 0) qualityIncrement = -2;
      if (item.name === 'Sulfuras, Hand of Ragnaros') qualityIncrement = 0, sellInIncrement = 0;
      qualityIncrement = this.calculateBackstage(item, qualityIncrement);
      qualityIncrement = this.calculateConjured(item, qualityIncrement);
      this.modifyItemProperty(item, qualityIncrement, 'quality');
      this.modifyItemProperty(item, sellInIncrement, 'sellIn');
    })
    return this.items
  }
}

module.exports = { Shop }