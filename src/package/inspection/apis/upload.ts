import { apiInspection } from '#/services/inspection';
import { ResponseWithData } from '#/types/response';

import { PayloadGeneratePresigned } from '../types';

export async function generatePresignedURLs(payload: PayloadGeneratePresigned) {
  const { data } = await apiInspection.post<ResponseWithData<string[]>>(
    '/v1/upload/presigned-urls',
    payload,
  );

  return data.data;
}
