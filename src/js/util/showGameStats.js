const showGameStats = ({
  totalGames,
  wonGames,
  lostGames,
  winRatio,
  loseRatio
}) => {
  const totalGamesRef = document.getElementById('stats-total-games');
  const wonGamesRef = document.getElementById('stats-won-games');
  const lostGamesRef = document.getElementById('stats-lost-games');
  const wonRatioRef = document.getElementById('stats-won-ratio');
  const loseRatioRef = document.getElementById('stats-lose-ratio');

  totalGamesRef.innerText = totalGames;
  wonGamesRef.innerText = wonGames;
  lostGamesRef.innerText = lostGames;
  wonRatioRef.innerText = `${winRatio}%`;
  loseRatioRef.innerText = `${loseRatio}%`;
};

export default showGameStats;
