window.onload = (async () => {
  await new Promise(r => setTimeout(r, 1000));
  const goldenNames = ['foster', 'predator', 'optimal', 'solar', 'wind', 'ruby', 'shark', 'wrap', 'samurai', 'atum', 'gold-digger', 'rubin-rain', 'amethyst-light', 'diamond-sky', 'emerald-cut'];
  const sectionIds = [...document.querySelectorAll('div > section')].map(el => el.id).filter(id => !['games', 'kings-game'].includes(id) && id);
  const url = 'https://raw.githubusercontent.com/oxi1224/files/main/data-polish.json';
  
  (async () => {
    const styles = {
      base: 'pointer-events: none; background-color: rgba(25, 24, 30, .95); border: .5px solid #dfb36b; font-weight: bold; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 13px; color: white; text-align: center; width: fit-content; height: fit-content; z-index: 9999999; border-radius: 5px; padding: .5rem .75rem;',
      good: 'box-shadow: rgba(80, 227, 109, 0.4) 0px 0px 6px, rgba(80, 227, 109, 0.4) 0px 0px 6px inset; border: 1px solid rgb(80 227 109); color: rgb(80 227 109);',
      bad: 'box-shadow: rgba(255,68,93,.4) 0px 0px 6px, rgba(255,68,93,.4) 0px 0px 6px inset; border: 1px solid rgb(255 68 93); color: rgb(255 68 93);',
      chancesBase: 'background-color: rgba(25, 24, 30, .95); pointer-events: none; position: fixed; font-size: 13px; text-align: center; width: fit-content; height: fit-content; z-index: 9999999; padding: .5rem .75rem; border-radius: .5rem;',
      chancesGood: 'box-shadow: rgba(80, 227, 109, 0.4) 0px 0px 6px, rgba(80, 227, 109, 0.4) 0px 0px 6px inset; border: 1px solid rgb(80 227 109); top: 20px; left: 20px; color: rgb(80 227 109);',
      chancesBad: 'box-shadow: rgba(255,68,93,.4) 0px 0px 6px, rgba(255,68,93,.4) 0px 0px 6px inset; border: 1px solid rgb(255 68 93); top: 20px; right: 20px; color: rgb(255 68 93);',
      winrate: 'top: 20px; left: 50%; transform: translateX(-50%); box-shadow: rgba(220, 174, 100, .4) 0px 0px 6px, rgba(220, 174, 100, .4) 0px 0px 6px inset; border: 1px solid rgb(220, 174, 100)',
    };
    const data = await (await fetch(url, { cache: 'no-cache' })).json();
    if (/https:\/\/key-drop.(com|gg)\/(pl|en)\/skins\/category\/.+/.test(window.location.href)) {
      const caseName = (window.location.href.split(/https:\/\/key-drop.com\/(pl|en)\/skins\/category\//))[2];
      const caseData = data[caseName];
      if (!caseData) return;
      const profitElm = document.createElement('div');
      const looseElm = document.createElement('div');
      const statsElm = document.createElement('div');
      document.body.style.position = 'relative';
      profitElm.style.cssText = styles.chancesBase + styles.chancesGood;
      profitElm.innerHTML = `Szanse na X razy zwortu:<br>${(Object.entries(caseData.profitChances).map(([k, v]) => `${k}: ${v}`)).join('<br>')}`;
      looseElm.style.cssText = styles.chancesBase + styles.chancesBad;
      looseElm.innerHTML = `Szanse na X razy straty:<br>${(Object.entries(caseData.looseChances).map(([k, v]) => `${k}: ${v}`)).join('<br>')}`;
      statsElm.style.cssText = styles.chancesBase + styles.winrate;
      statsElm.innerHTML = `Szansa na <b>wygraną</b>: ${caseData.winChance}%<br>Szansa na <b>przegraną</b>: ${caseData.looseChance}%`;
      [profitElm, looseElm, statsElm].forEach(e => document.body.appendChild(e));
    }

    if (window.location.href.match(/https:\/\/key-drop.com\/(pl|en)\//)) {
      // eslint-disable-next-line no-constant-condition
      if (!document.getElementById(sectionIds[0])) while (true) {
        await new Promise(r => setTimeout(r, 1000));
        if (document.getElementById(sectionIds[0])) break;
      }
      
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
        const infoEl = document.createElement('div');
        infoEl.style.cssText = styles.base + ((caseData?.winChance < 30 || caseData?.pricePerPln > 300) ? styles.bad : styles.good);
        infoEl.innerHTML = goldenNames.includes(caseName[1]) ? `Średni&nbspgold&nbspna&nbspzł:&nbsp${caseData.pricePerPln}` : `Winrate:&nbsp${caseData.winChance}%`;
        if (!goldenNames.includes(caseName[1])) {
          c.addEventListener('mouseover', () => {
            const profitElm = document.createElement('div');
            const looseElm = document.createElement('div');
            const statsElm = document.createElement('div');
            document.body.style.position = 'relative';
            profitElm.style.cssText = styles.chancesBase + styles.chancesGood;
            profitElm.innerHTML = `Szanse na X razy zwortu:<br>${(Object.entries(caseData.profitChances).map(([k, v]) => `${k}: ${v}`)).join('<br>')}`;
            profitElm.id = 'temp';
            looseElm.style.cssText = styles.chancesBase + styles.chancesBad;
            looseElm.innerHTML = `Szanse na X razy straty:<br>${(Object.entries(caseData.looseChances).map(([k, v]) => `${k}: ${v}`)).join('<br>')}`;
            looseElm.id = 'temp';
            statsElm.style.cssText = styles.chancesBase + styles.winrate;
            statsElm.innerHTML = `${caseData.websiteName}:<br>Szansa na <b>wygraną</b>: ${caseData.winChance}%<br>Szansa na <b>przegraną</b>: ${caseData.looseChance}%`;
            statsElm.id = 'temp';
            [profitElm, looseElm, statsElm].forEach(e => document.body.appendChild(e));
          });
          c.addEventListener('mouseout', () => [...document.querySelectorAll('div#temp')].forEach(e => e.remove()));
        } 
        c.appendChild(infoEl);
      });
    }
  })();
})();
