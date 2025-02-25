export type ResponseWithData<T> = {
  data: T;
  success: boolean;
};

export type Pagination = {
  page: number;
  per_page: number;
  total_data: number;
  total_page: number;
};
