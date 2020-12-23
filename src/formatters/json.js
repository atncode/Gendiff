const getJson = (ast) => {
  const json = ast.flatMap((obj) => JSON.stringify(obj));
  return [...json].join('');
};

export default getJson;
