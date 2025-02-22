import { FormProvider, useForm } from 'react-hook-form';

import { InspectionFormData } from '~/inspection/types';
import { InspectionForm } from '~/inspection/components/form';

function InspectionPageCreate() {
  const form = useForm<InspectionFormData>({
    defaultValues: {
      inspections: [],
    },
  });

  const handleSubmit = (data: InspectionFormData) => {
    if (data.inspections.length < 1) {
      return;
    }

    console.log(data);
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
