const puppeteer = require('puppeteer');

async function scrapping(){
        const browser = await puppeteer.launch({
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
            ],
          }/*,{headless:false},{devtools:true}*/);
        const page = await browser.newPage();
        await page.goto('https://defensorsporting.com.uy/tabla/tabla-anual/');
        await page.waitForSelector('#DataTables_Table_0');
        const tab=await page.evaluate(()=> {
                debugger;
                const tab = [];
                const positions = document.querySelectorAll('td.data-rank');
                const clubs = document.querySelectorAll('td.data-name');
                const imgUrl = document.querySelectorAll('.attachment-sportspress-fit-icon');
                const numOfMatches = document.querySelectorAll('td.data-p');
                const numOfWins = document.querySelectorAll('td.data-w');
                const numOfTies = document.querySelectorAll('td.data-d');
                const numOfLoses = document.querySelectorAll('td.data-l');
                const gd = document.querySelectorAll('td.data-gd');
                const pts = document.querySelectorAll('td.data-pts');
                var n = pts.length;
                for (i = 0; i < n; i++) {
                    const tmp = {};
                    tmp.pos = parseInt(positions[i].textContent,10); 
                    tmp.clubName = clubs[i].textContent;
                    tmp.imgUrl = imgUrl[i].getAttribute('src');
                    tmp.played = parseInt(numOfMatches[i].textContent,10);
                    tmp.wins = parseInt(numOfWins[i].textContent,10);
                    tmp.ties = parseInt(numOfTies[i].textContent,10);
                    tmp.loses = parseInt(numOfLoses[i].textContent,10);  
                    tmp.gd = parseInt(gd[i].textContent,10);
                    tmp.pts = parseInt(pts[i].textContent,10);
                    tab.push(tmp);
                }
                return tab;
            });
        browser.close();       
        return tab;
}

module.exports.scrapping=scrapping();
