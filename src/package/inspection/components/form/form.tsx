import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Card, Col, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '#/components/input';

import { InspectionFormData } from '~/inspection/types';

import { COL_PROPS } from './constants';
import { StyledRow } from './styles';

type InspectionFormProps = {
  onSubmit: (data: InspectionFormData) => void;
};

function InspectionForm({ onSubmit }: InspectionFormProps) {
  const form = useFormContext<InspectionFormData>();

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'inspections',
  });

  const onUploadImage: Required<UploadProps>['customRequest'] = ({ file }) => {
    const validFile = file as RcFile;
    fieldArray.append({ name: '', file: validFile });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fieldArray.fields.length > 0 && (
        <StyledRow gutter={[16, 16]}>
          {fieldArray.fields.map((field, index) => {
            return (
              <Col key={field.id} {...COL_PROPS}>
                <Card
                  title={`Image ${index + 1}`}
                  extra={
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
                  }
                  size="small"
                >
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
                </Card>
              </Col>
            );
          })}
        </StyledRow>
      )}

      <StyledRow gutter={[16, 16]}>
        <Col {...COL_PROPS}>
          <Upload.Dragger
            accept="image/*"
            customRequest={onUploadImage}
            multiple
            showUploadList={false}
          >
            <InboxOutlined />
            <p>Click or drag file to this area to upload</p>
            <p>Support for a single or bulk upload</p>
          </Upload.Dragger>
        </Col>
      </StyledRow>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}

export default InspectionForm;
