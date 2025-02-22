import { Input, InputProps, InputRef, Typography } from 'antd';
import { forwardRef } from 'react';

type SharedInputProps = InputProps & {
  error?: string;
};

const SharedInput = forwardRef<InputRef, SharedInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <Input {...props} ref={ref} status={error ? 'error' : ''} />
        {!!error && <Typography.Text type="danger">{error}</Typography.Text>}
      </>
    );
  },
);

SharedInput.displayName = 'Input';

export default SharedInput;
