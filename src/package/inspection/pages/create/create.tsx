import { Spin } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PageTitle } from '#/components/page-title';
import { useMessage } from '#/contexts/message';

import { generatePresignedURLs } from '~/inspection/apis/upload';
import { InspectionForm } from '~/inspection/components/form';
import { InspectionFormData } from '~/inspection/types';

function InspectionPageCreate() {
  const message = useMessage();

  const form = useForm<InspectionFormData>({
    defaultValues: {
      inspections: [{ file: undefined, name: undefined }],
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: InspectionFormData) => {
    try {
      setLoading(true);

      const payload = {
        files: data.inspections.map((inspection) => {
          return {
            custom_name: inspection.name,
            name: inspection.file!.name,
          };
        }),
      };

      const presignedURLs = await generatePresignedURLs(payload);

      await Promise.all(
        data.inspections.map(async (inspection, index) => {
          await axios.put(presignedURLs[index], inspection.file, {
            headers: {
              'Content-Type': inspection.file?.type,
            },
          });
        }),
      );

      form.reset();
      message.success?.('Inspection submitted successfully');
    } catch {
      message.error?.('Ops, something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle value="Create Inspection" />

      <FormProvider {...form}>
        <InspectionForm onSubmit={handleSubmit} />
      </FormProvider>

      <Spin spinning={loading} fullscreen size="large" tip="Submitting..." />
    </>
  );
}

export default InspectionPageCreate;
