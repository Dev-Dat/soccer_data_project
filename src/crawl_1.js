let axios = require('axios');
let cheerio = require('cheerio');
fs = require('fs');
var pages = ``;
let url = 'https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop?land_id=0&ausrichtung=alle&spielerposition_id=alle&altersklasse=alle&jahrgang=0&kontinent_id=0&plus=2';
let url2 = 'https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop?ajax=yw1&altersklasse=alle&ausrichtung=alle&jahrgang=0&kontinent_id=0&land_id=0&page=1&plus=1&spielerposition_id=alle';

let crawlbox = [];
for (let page = 1; page <= 20; page++){
    console.log(page);
        axios(url = `https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop?ajax=yw1&altersklasse=alle&ausrichtung=alle&jahrgang=0&kontinent_id=0&land_id=0&page=${page}&plus=1&spielerposition_id=alle`)
    .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            
            $('table.items > tbody > tr').each(function(page, elem) {
            crawlbox.push([{
                player_rank : $(elem).find(' > td:nth-child(1)').text(),
                player_name : $(elem).find(' > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim(),
                player_position : $(elem).find(' > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)').text().trim(),
                player_age : $(elem).find(' > td:nth-child(3)').text().trim(),
                player_nationality : $(elem).find(' > td:nth-child(4) img').attr('alt'),
                player_club : $(elem).find(' > td:nth-child(5) a img').attr('alt'),
                player_mktValue_Recent : $(elem).find(' > td:nth-child(6)').text().trim(),
                player_mktValue_Previous : $(elem).find(' > td:nth-child(6) span').attr('title').trim(),
                player_matches : $(elem).find(' > td:nth-child(7)').text().trim(),
                player_goals : $(elem).find(' > td:nth-child(8)').text().trim(),
                player_ownGoals : $(elem).find(' > td:nth-child(9)').text().trim(),
                player_assists : $(elem).find(' > td:nth-child(10)').text().trim(),
                player_1stYello : $(elem).find(' > td:nth-child(11)').text().trim(),
                player_2ndYello : $(elem).find(' > td:nth-child(12)').text().trim(),
                player_redCards : $(elem).find(' > td:nth-child(13)').text().trim(),
                player_subsOn : $(elem).find(' > td:nth-child(14)').text().trim(),
                player_subsOff : $(elem).find(' > td:nth-child(15)').text().trim()
                }]);
                console.log(page);
                fs.writeFileSync('playerinfo62.json', 
                JSON.stringify(crawlbox)
                );
            })
    })
}