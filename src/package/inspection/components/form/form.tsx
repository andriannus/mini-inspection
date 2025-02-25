import { InboxOutlined } from '@ant-design/icons';
import { Button, Col, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '#/components/input';
import { useFormValues } from '#/hooks/use-form-values';

import { InspectionFormData } from '~/inspection/types';

import { COL_PROPS } from './constants';
import { CardForAction, StyedCard, StyledImage, StyledRow } from './styles';

type InspectionFormProps = {
  onSubmit: (data: InspectionFormData) => void;
};

function InspectionForm({ onSubmit }: InspectionFormProps) {
  const form = useFormContext<InspectionFormData>();
  const values = useFormValues();

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'inspections',
  });

  const onFileSelected = (file: RcFile, index: number) => {
    if (!values.inspections[index].file) {
      form.setValue(`inspections.${index}.file`, file);
    } else {
      fieldArray.append({ name: '', file });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fieldArray.fields.length > 0 && (
        <StyledRow gutter={[16, 16]}>
          {fieldArray.fields.map((field, index) => {
            return (
              <Col key={field.id} {...COL_PROPS}>
                <StyedCard
                  title={`Image ${index + 1}`}
                  extra={
                    fieldArray.fields.length > 1 && (
                      <Button
                        danger
                        size="small"
                        type="text"
                        onClick={() => {
                          fieldArray.remove(index);
                        }}
                      >
                        Delete
                      </Button>
                    )
                  }
                  size="small"
                >
                  {values.inspections[index].file ? (
                    <>
                      <StyledImage
                        src={URL.createObjectURL(
                          values.inspections[index].file,
                        )}
                      />

                      <Controller
                        control={form.control}
                        name={`inspections.${index}.name`}
                        rules={{ required: 'Enter a file name' }}
                        render={({ field, fieldState }) => {
                          return (
                            <Input
                              {...field}
                              id={`input-name-${index}`}
                              error={fieldState.error?.message}
                              placeholder="File name"
                            />
                          );
                        }}
                      />
                    </>
                  ) : (
                    <Upload.Dragger
                      accept="image/*"
                      customRequest={(options) => {
                        onFileSelected(options.file as RcFile, index);
                      }}
                      multiple
                      showUploadList={false}
                    >
                      <InboxOutlined />
                      <p>Click or drag file to this area to upload</p>
                      <p>Support for a single or bulk upload</p>
                    </Upload.Dragger>
                  )}
                </StyedCard>
              </Col>
            );
          })}

          <Col {...COL_PROPS}>
            <CardForAction>
              <Button
                ghost
                type="primary"
                onClick={() => {
                  fieldArray.append({ name: '', file: undefined });
                }}
              >
                Add Image
              </Button>
            </CardForAction>
          </Col>
        </StyledRow>
      )}

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}

export default InspectionForm;
