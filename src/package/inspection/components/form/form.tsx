import { InboxOutlined } from '@ant-design/icons';
import { Button, Col, Typography } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '#/components/input';
import { useFormValues } from '#/hooks/use-form-values';

import type { InspectionFormData } from '~/inspection/types';

import { COL_PROPS } from './constants';
import {
  CardForAction,
  StyedCard,
  StyledImage,
  StyledRow,
  StyledUploadDragger,
  WrapperForIcon,
} from './styles';

type InspectionFormProps = {
  onSubmit: (data: InspectionFormData) => void;
};

function InspectionForm({ onSubmit }: InspectionFormProps) {
  const form = useFormContext<InspectionFormData>();
  const values = useFormValues<InspectionFormData>();

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'inspections',
  });

  const onFileSelected = (file: RcFile, index: number) => {
    const indexWithoutFile = values.inspections.findIndex((i) => !i.file);

    if (!values.inspections[index].file) {
      form.setValue(`inspections.${index}.file`, file, {
        shouldValidate: true,
      });
    } else if (indexWithoutFile > -1) {
      form.setValue(`inspections.${indexWithoutFile}.file`, file, {
        shouldValidate: true,
      });
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
                    <Controller
                      control={form.control}
                      name={`inspections.${index}.file`}
                      rules={{ required: 'Select a file' }}
                      render={({ fieldState }) => {
                        return (
                          <>
                            <StyledUploadDragger
                              accept="image/*"
                              customRequest={(options) => {
                                onFileSelected(options.file as RcFile, index);
                              }}
                              multiple
                              showUploadList={false}
                            >
                              <WrapperForIcon>
                                <InboxOutlined />
                              </WrapperForIcon>

                              <Typography.Title level={5}>
                                Click or drag file to this area to upload
                              </Typography.Title>

                              <Typography.Text type="secondary">
                                Support for a single or bulk upload
                              </Typography.Text>
                            </StyledUploadDragger>

                            {fieldState.error && (
                              <Typography.Text type="danger">
                                {fieldState.error.message}
                              </Typography.Text>
                            )}
                          </>
                        );
                      }}
                    />
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
