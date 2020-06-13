import getDb from '.';
import { showTime } from '../util';

const changeBestGame = async mode => {
  const db = getDb();
  const bestGames = await db.games
    .where('mode')
    .equals(mode)
    .and(game => game.result === 'w') // can't chain multiple wheres unfortunately: https://github.com/dfahlander/Dexie.js/issues/427
    .sortBy('time');
  const best5 = bestGames.slice(0, 5);
  showTime(best5, '#best-scores tbody');
};

export default changeBestGame;
