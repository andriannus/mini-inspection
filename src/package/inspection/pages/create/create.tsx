import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';

import { InspectionFormData } from '~/inspection/types';
import { InspectionForm } from '~/inspection/components/form';
import { generatePresignedURLs } from '~/inspection/apis/upload';

function InspectionPageCreate() {
  const form = useForm<InspectionFormData>({
    defaultValues: {
      inspections: [],
    },
  });

  const handleSubmit = async (data: InspectionFormData) => {
    if (data.inspections.length < 1) {
      return;
    }

    try {
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

      console.info('SUCCESS');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <InspectionForm onSubmit={handleSubmit} />
      </FormProvider>
    </div>
  );
}

export default InspectionPageCreate;
