import { Typography } from 'antd';
import { useEffect } from 'react';

function StandalonePageCreate() {
  useEffect(() => {
    document.title = 'Welcome to Inspection';
  }, []);

  return (
    <>
      <Typography.Title>Oh hi! Welcome to Inspection App.</Typography.Title>

      <Typography.Paragraph>
        Found something interesting during your inspection?
      </Typography.Paragraph>
    </>
  );
}

export default StandalonePageCreate;
