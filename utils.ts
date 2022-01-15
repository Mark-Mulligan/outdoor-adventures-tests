export const calculateDataEnd = (page: number, limit: number, totalResults: number) => {
  if (page * limit > totalResults) {
    return totalResults;
  }

  return page * limit;
};

export const calculateNumResult = (page: number, limit: number, totalResults: number) => {
  if (page * limit > totalResults) {
    return totalResults - (page - 1) * limit;
  }

  return limit;
};

export const parkDataParameters = [
  { page: 1, limit: 10 },
  { page: 1, limit: 25 },
  { page: 1, limit: 50 },
  { page: 2, limit: 10 },
  { page: 2, limit: 25 },
  { page: 2, limit: 50 },
  { page: 3, limit: 50 },
  { page: 4, limit: 50 },
  { page: 5, limit: 50 },
  { page: 6, limit: 50 },
  { page: 7, limit: 50 },
  { page: 8, limit: 50 },
  { page: 9, limit: 50 },
  { page: 10, limit: 50 },
];

export const parkDataResultKeys = ['fullname', 'parkcode', 'states', 'designation'];

// node --loader ts-node/esm parkDataChecker.ts
