import { Button, Empty } from 'antd';
import { useNavigate } from 'react-router';

import { Layout } from './styles';

function StandalonePage404() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Oops! The page you’re looking for can’t be found. It might have been moved or no longer exists. Try checking the URL or go back to the homepage."
      >
        <Button
          type="primary"
          onClick={() => {
            navigate('/home', { replace: true });
          }}
        >
          Take me back
        </Button>
      </Empty>
    </Layout>
  );
}

export default StandalonePage404;
