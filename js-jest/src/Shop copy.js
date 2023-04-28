
class Shop {
  constructor(items = []) {
    this.items = items;
    this.selectedItem;
    this.qualityIncrementModifier = 1;
  }

  modifyItemProperty(item, increment, property) {
    item[property] += increment;
  }

  backstageSellByCheck(item) {
    if (item.sellBy <= 10){
      this.qualityIncrementModifier = 2;
    }
    if (item.sellBy <= 5) {
      this.qualityIncrementModifier = 3;
    }
  }

  setBackstageIncrementModifier(item) {
    if (item.name.toLowerCase().match('backstage passes')) {
      this.backstageSellByCheck(item)
    }
  }

  setSellByIncrementModifier(item) {
    if (item.sellBy < 1 && item.qualityIncrement < 0) {
      this.qualityIncrementModifier = 2;
    }
  }

  setMinimumIncrementModifier(item) {
    if (item.quality + item.qualityIncrement <= 0) {
      this.qualityIncrementModifier = -(item.quality) / item.qualityIncrement;
    }
  }

  setMaximumIncrementModifier(item) {
    if (item.quality + item.qualityIncrement >= 50) {
      this.qualityIncrementModifier = (-item.quality + 50) / item.qualityIncrement;
    }
    if (item.qualityIncrement === 0) {
      this.qualityIncrementModifier = 0;
    }
  }

  setQualityIncrementModifier(item) {
    this.setSellByIncrementModifier(item)
    this.setBackstageIncrementModifier(item)
    this.setMinimumIncrementModifier(item)
    this.setMaximumIncrementModifier(item)
  }

  dailyUpkeep() {
    this.items.forEach(item => {
      this.setQualityIncrementModifier(item);
      this.modifyItemProperty(item, item.qualityIncrement * this.qualityIncrementModifier, 'quality');
      this.modifyItemProperty(item, item.sellByIncrement, 'sellBy');
    })
    return this.items;
  }
}

module.exports = { Shop }