const SteamMarketFetcher = require('steam-market-fetcher');

function capitalizeWords(str, exceptions = []) {
  return str.replace(/\b\w+\b/g, function(word) {
    if (exceptions.includes(word.toLowerCase())) {
      return word;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
};

var exceptions = ['with', 'of'];

var exterior = {
  1: '(Factory New)',
  2: '(Minimal Wear)',
  3: '(Field-Tested)',
  4: '(Well-Worn)',
  5: '(Battle-Scarred)',
};


module.exports = {
  async search(request, response) {
    try {
      
      const market = new SteamMarketFetcher({
        currency: 'BRL',
        format: 'json'
      });

      let itemName = request.query.item.toUpperCase();
      let itemSkin = capitalizeWords(request.query.skin, exceptions);
      let itemExterior = request.query.exterior;

      switch (request.query.exterior) {
        case 'fn':

          itemExterior = exterior['1'];
          break;

        case 'mw':
          
          itemExterior = exterior['2'];
          break;

        case 'ft':
          
          itemExterior = exterior['3'];
          break;

        case 'ww':
          
          itemExterior = exterior['4'];
          break;

        case 'bs':
          
          itemExterior = exterior['5'];
          break;
      
        default:
          break;
      };

      const resultPrice = await market.getItemPrice({
        market_hash_name: `${itemName} | ${itemSkin} ${itemExterior}`,
        appid: request.query.appId || 730
      });

      const resultImage = await market.getItemImage({
        market_hash_name: `${itemName} | ${itemSkin} ${itemExterior}`,
        appid: request.query.appId || 730
      });

      return response.status(200).json({
        Name: `${itemName} | ${itemSkin}`,
        Image: resultImage,
        Median_Price: resultPrice.median_price
      });

    } catch (error) {
      console.log(error);
    };
  }
};