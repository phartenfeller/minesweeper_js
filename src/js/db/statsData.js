import getDb from '.';
import { showGameStats, showTime } from '../util';
import changeBestGame from './changeBestGames';

const getLast5Games = async db => {
  const data = await db.games.orderBy('date').reverse().limit(5).toArray();
  showTime(data, '#scores tbody');
};

const getGameStats = async db => {
  const totalGames = await db.games.count();
  const wonGames = await db.games.where('result').equals('w').count();
  const lostGames = await db.games.where('result').equals('l').count();

  const winRatio =
    totalGames === 0 ? 0 : Math.round((wonGames / totalGames) * 100);
  const loseRatio =
    totalGames === 0 ? 0 : Math.round((lostGames / totalGames) * 100);

  showGameStats({ totalGames, wonGames, lostGames, winRatio, loseRatio });
};

const setModeSelectOptions = async db => {
  const options = await db.games.orderBy('mode').uniqueKeys();
  console.log('options', options);
  const selectList = document.getElementById('stats-mode-select');

  const { length } = selectList.options;
  for (let i = length - 1; i >= 0; i -= 1) {
    selectList.options[i] = null;
  }

  options.forEach((option, i) => {
    selectList.options[selectList.options.length] = new Option(
      option,
      option,
      i === 0,
      i === 0
    );

    if (i === 0) {
      changeBestGame(option);
    }
  });
};

const updateStatsData = async () => {
  const db = getDb();
  getLast5Games(db);
  getGameStats(db);
  setModeSelectOptions(db);
};

export default updateStatsData;
