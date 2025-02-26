import { useInfiniteQuery } from '@tanstack/react-query';
import { Button, Col, Row, Spin } from 'antd';
import { lazy } from 'react';

import { fetchInspectionFiles } from '~/inspection/apis/upload';
import { COL_PROPS } from '~/inspection/components/form/constants';

import { ContainerForAction } from './styles';

const ImageCard = lazy(() =>
  import('./components/card').then((module) => ({
    default: module.ImageCard,
  })),
);

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
    return (
      <ContainerForAction>
        <Spin size="large" />
      </ContainerForAction>
    );
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
              <Col key={file._id} {...COL_PROPS} xxl={4}>
                <ImageCard file={file} />
              </Col>
            );
          });
        })}
      </Row>

      {queryFiles.isFetchingNextPage && (
        <ContainerForAction>
          <Spin size="large" />
        </ContainerForAction>
      )}

      {!queryFiles.isFetchingNextPage && queryFiles.hasNextPage && (
        <ContainerForAction>
          <Button
            type="primary"
            onClick={() => {
              queryFiles.fetchNextPage();
            }}
          >
            Load More
          </Button>
        </ContainerForAction>
      )}
    </>
  );
}

export default InspectionPageImage;
