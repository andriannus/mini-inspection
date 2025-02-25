import { Spin } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useMessage } from '#/contexts/message';

import { generatePresignedURLs } from '~/inspection/apis/upload';
import { InspectionForm } from '~/inspection/components/form';
import { InspectionFormData } from '~/inspection/types';

function InspectionPageCreate() {
  const message = useMessage();

  const form = useForm<InspectionFormData>({
    defaultValues: {
      inspections: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: InspectionFormData) => {
    if (data.inspections.length < 1) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        files: data.inspections.map((inspection) => {
          return {
            custom_name: inspection.name,
            name: inspection.file.name,
          };
        }),
      };

      const presignedURLs = await generatePresignedURLs(payload);

      await Promise.all(
        data.inspections.map(async (inspection, index) => {
          const formData = new FormData();
          formData.append('file', inspection.file);

          await axios.put(presignedURLs[index], formData);
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
      <Spin spinning={loading} fullscreen size="large" tip="Submitting..." />

      <FormProvider {...form}>
        <InspectionForm onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
}

export default InspectionPageCreate;
