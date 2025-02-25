import { Pagination, ResponseWithData } from '#/types/response';

export type InspectionFormData = {
  inspections: { name: string; file?: File }[];
};

export type PayloadGeneratePresigned = {
  files: {
    name: string;
    custom_name: string;
  }[];
};

export type InspectionFile = {
  _id: string;
  name: string;
  key: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type InspectionFilesResponse = ResponseWithData<{
  files: InspectionFile[];
  pagination: Pagination;
}>;
