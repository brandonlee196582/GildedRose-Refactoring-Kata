class Shop {
  constructor(items = []) {
    this.items = items;
    this.qualityIncrementModifier = 1;
  }

  dailyUpkeepOfEachItem(){
    this.items.forEach(item => {
      this.modifyAllIncrementers(item);
      this.modifyItemProperty(item, item.qualityIncrement * this.qualityIncrementModifier, 'quality');
      this.modifyItemProperty(item, item.sellByIncrement, 'sellBy');
    })
    return this.items;
  }

  modifyAllIncrementers(item) {
    this.setSellByIncrementModifier(item)
    this.setBackstageIncrementModifier(item)
    this.setMinimumIncrementModifier(item)
    this.setMaximumIncrementModifier(item)
  }

  setSellByIncrementModifier(item) {
    if (item.sellBy < 1 && item.qualityIncrement < 0) {
      this.qualityIncrementModifier = 2;
    }
  }

  setBackstageIncrementModifier(item) {
    if (item.name.toLowerCase().match('backstage passes')) {
      this.backstageSellByCheck(item)
    }
  }

  setMinimumIncrementModifier(item) {
    if (item.quality + item.qualityIncrement <= 0) {
      this.qualityIncrementModifier = -(item.quality) / item.qualityIncrement;
    }
  }

  setMaximumIncrementModifier(item) {
    this.ifItemQualityMoreThan50(item);
    this.ifQualityIncrementIsZero(item);
  }

  modifyItemProperty(item, increment, property) {
    item[property] += increment;
  }

  backstageSellByCheck(item) {
    this.ifSellByLessThanTen(item);
    this.ifSellByLessThanFive(item);
  }

  ifSellByLessThanTen(item) {
    if (item.sellBy <= 10) {
      this.qualityIncrementModifier = 2;
    }
  }

  ifSellByLessThanFive(item) {
    if (item.sellBy <= 5) {
      this.qualityIncrementModifier = 3;
    }
  }
  
  ifItemQualityMoreThan50(item) {
    if (item.quality + item.qualityIncrement >= 50) {
      this.qualityIncrementModifier = (-item.quality + 50) / item.qualityIncrement;
    }
  }

  ifQualityIncrementIsZero(item) {
    if (item.qualityIncrement === 0) {
      this.qualityIncrementModifier = 0;
    }
  }
}

module.exports = { Shop }