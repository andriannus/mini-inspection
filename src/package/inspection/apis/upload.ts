import type { AxiosRequestConfig } from 'axios';

import { apiInspection } from '#/services/inspection';
import type { ResponseWithData } from '#/types/response';

import type {
  InspectionFilesResponse,
  PayloadGeneratePresigned,
} from '../types';

export async function generatePresignedURLs(payload: PayloadGeneratePresigned) {
  const { data } = await apiInspection.post<ResponseWithData<string[]>>(
    '/v1/upload/presigned-urls',
    payload,
  );

  return data.data;
}

export async function fetchInspectionFiles(config: AxiosRequestConfig) {
  const { data } = await apiInspection.get<InspectionFilesResponse>(
    '/v1/upload/files',
    config,
  );

  return data.data;
}
