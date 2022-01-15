export type parkTableData = {
  fullname: string;
  parkcode: string;
  states: string;
  designation: string;
};

export type parksPaginatedResult = {
  totalResults: number;
  totalPages: number;
  dataStart: number;
  dataEnd: number;
  currentPage: number;
  results: parkTableData[];
};

export type parksApiRouteResponse = {
  status?: number;
  data: parksPaginatedResult;
};

export type apiTestResponse = {
  status: number;
  data: { message: string };
};
