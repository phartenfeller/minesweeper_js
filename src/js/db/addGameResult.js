import getDb from '.';

const addGameResult = async ({ mode, result, time }) => {
  const db = getDb();
  await db.games.add({ mode, result, time, date: new Date().getTime() });
};

export default addGameResult;
