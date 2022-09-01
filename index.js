// event: div.case__name
// unified: div.relative.grid.grid-cols-1.grid-rows-1.transition-all
// ids: [
//  section.youtubers-cases
//  section.cs-go-kings
//  section.cs-go-cage
//  section.cs-go-magic
//  section.cs-go-heroes
//  section.cs-go-premium
//  section.cs-go-skins
//  section.cs-go-guns
//  section.gold-area
// ]
//
// NAME class: div.text-center.text-white.uppercase.rounded-lg
window.onload = (async () => {
  await new Promise(r => setTimeout(r, 1000));
  const goldenNames = ['foster', 'predator', 'optimal', 'solar', 'wind', 'ruby', 'shark', 'wrap', 'samurai', 'atum', 'gold-digger', 'rubin-rain', 'amethyst-light', 'diamond-sky', 'emerald-cut'];
  const sectionIds = [...document.querySelectorAll('div > section')].map(el => el.id).filter(id => !['games', 'kings-game'].includes(id) && id);
  const url = 'https://raw.githubusercontent.com/oxi1224/files/main/data-new.json';
  
  (async () => {
    const data = await (await fetch(url)).json();
    if (/https:\/\/key-drop.com\/(pl|en)\/skins\/category\/.+/.test(window.location.href)) {
      const caseName = (window.location.href.split(/https:\/\/key-drop.com\/(pl|en)\/skins\/category\//))[2];
      const caseData = data[caseName];
      if (!caseData) return;
      const profitElm = document.createElement('div');
      const looseElm = document.createElement('div');
      const statsElm = document.createElement('div');
      document.body.style.position = 'relative';
      profitElm.style.cssText = 'background-color: #5cd65c; border: 2px solid #2eb82e; position: fixed; top: 20px; left: 20px; font-size: 13px; color: white; text-align: center; width: fit-content; height: fit-content; z-index: 9999999; border-radius: 20px; padding: 1rem 1.5rem;';
      profitElm.innerHTML = `Szanse na X razy zwortu:<br>${(Object.entries(caseData.profitChances).map(([k, v]) => `${k}: ${v}`)).join('<br>')}`;
      looseElm.style.cssText = 'background-color: #ff3333; border: 2px solid #cc0000; position: fixed; top: 20px; right: 20px; font-size: 13px; color: white; text-align: center; width: fit-content; height: fit-content; z-index: 9999999; border-radius: 20px; padding: 1rem 1.5rem;';
      looseElm.innerHTML = `Szanse na X razy straty:<br>${(Object.entries(caseData.looseChances).map(([k, v]) => `${k}: ${v}`)).join('<br>')}`;
      statsElm.style.cssText = 'background-color: #3e321e; border: 1px solid #dcae64; position: fixed; top: 20px; left: 50%; transform: translateX(-50%); font-size: 13px; color: white; text-align: center; width: fit-content; height: fit-content; z-index: 99999; border-radius: 5px; padding: 1rem 1.5rem;';
      statsElm.innerHTML = `Szansa na <b>wygraną</b>: ${caseData.winChance}%<br>Szansa na <b>przegraną</b>: ${caseData.looseChance}%`;
      document.body.appendChild(profitElm);
      document.body.appendChild(looseElm);
      document.body.appendChild(statsElm);
      console.log(statsElm);
    }

    if (window.location.href.match(/https:\/\/key-drop.com\/(pl|en)\//)) {
      // eslint-disable-next-line no-constant-condition
      if (!document.getElementById(sectionIds[0])) while (true) {
        await new Promise(r => setTimeout(r, 1000));
        if (document.getElementById(sectionIds[0])) break;
      }
      // css-vgih4x css-rvmde
      const eventCases = [...document.querySelectorAll('div.case--event')];
      const otherCases = (() => {
        const returnArr = [];
        sectionIds.forEach(sID => {
          const s = document.getElementById(sID);
          returnArr.push(...s.querySelectorAll('div.relative.grid.grid-cols-1.grid-rows-1.transition-all'));
        });
        return returnArr;
      })();
      const cases = eventCases.concat(otherCases);
      cases.forEach(c => {
        if (!c) return;
        const caseName = (((c.querySelector('a.z-20.w-full.h-full.col-start-1.row-start-1.row-end-3') ?? c.querySelector('a.case__link'))?.href)?.split('/skins/category/'));
        const caseData = data[caseName[1]];
        if (!caseData) return;
        c.style.position = 'relative';
        const infoEl = document.createElement('div');
        infoEl.style.cssText = `${(caseData?.winChance < 30 || caseData?.pricePerPln > 350) ? 'background-color: #ff3333; border: 2px solid #cc0000;' : 'background-color: #5cd65c; border: 2px solid #2eb82e;'} position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 13px; color: white; text-align: center; width: fit-content; height: fit-content; z-index: 9999999; border-radius: 20px; padding: .25rem .5rem;`;
        infoEl.textContent = goldenNames.includes(caseName[1]) ? `Średni gold na zł: ${caseData.pricePerPln}` : `Winrate: ${caseData.winChance}%`;
        c.appendChild(infoEl);
      });
    }
  })();
})();