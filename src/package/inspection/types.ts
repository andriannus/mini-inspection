export type InspectionFormData = {
  inspections: { name: string; file?: File }[];
};

export type PayloadGeneratePresigned = {
  files: {
    name: string;
    custom_name: string;
  }[];
};
