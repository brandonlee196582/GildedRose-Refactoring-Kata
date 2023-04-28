
class Item {
  constructor(name, sellBy, quality, sellByIncrement, qualityIncrement){
    this.name = name;
    this.sellBy = sellBy;
    this.quality = quality;
    this.sellByIncrement = sellByIncrement;
    this.qualityIncrement = qualityIncrement;
  }
}

module.exports = {Item}