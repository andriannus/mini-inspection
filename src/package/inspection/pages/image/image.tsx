import { useInfiniteQuery } from '@tanstack/react-query';
import { Button, Col, Image, Row, Spin } from 'antd';

import { fetchInspectionFiles } from '~/inspection/apis/upload';

function InspectionPageImage() {
  const queryFiles = useInfiniteQuery({
    queryKey: ['inspection-files'],
    queryFn: ({ pageParam }) => {
      return fetchInspectionFiles({
        params: {
          page: pageParam,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.total_page) {
        return lastPage.pagination.page + 1;
      }

      return undefined;
    },
  });

  if (queryFiles.isFetching && !queryFiles.isFetchingNextPage) {
    return <Spin />;
  }

  if (queryFiles.isError) return null;

  if (queryFiles.data?.pages[0].pagination.total_page === 0) {
    return <span>No data</span>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        {queryFiles.data?.pages.map((group) => {
          return group.files.map((file) => {
            return (
              <Col key={file._id} span={4}>
                <Image src={file.url} />
              </Col>
            );
          });
        })}
      </Row>

      {queryFiles.isFetchingNextPage && <Spin />}

      {!queryFiles.isFetchingNextPage && queryFiles.hasNextPage && (
        <Button type="primary">Load More</Button>
      )}
    </>
  );
}

export default InspectionPageImage;
