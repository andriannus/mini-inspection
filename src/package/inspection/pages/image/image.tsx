import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Flex,
  Row,
  Spin,
  Typography,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { lazy, Suspense, useMemo, useState } from 'react';

import { PageTitle } from '#/components/page-title';

import { fetchInspectionFiles } from '~/inspection/apis/upload';
import { COL_PROPS } from '~/inspection/components/form/constants';

import { ContainerForAction, StyledRow } from './styles';

const ImageCard = lazy(() =>
  import('./components/card').then((module) => ({
    default: module.ImageCard,
  })),
);

function InspectionPageImage() {
  const [dateRange, setDateRange] = useState<string[]>([]);

  const dateRangeFormatted = useMemo<RangePickerProps['value']>(() => {
    const [startDate, endDate] = dateRange;

    if (!startDate || !endDate) return [undefined, undefined];
    return [dayjs(startDate), dayjs(endDate)];
  }, [dateRange]);

  const queryFiles = useInfiniteQuery({
    queryKey: ['inspection-files', dateRange[0], dateRange[1]],
    queryFn: ({ pageParam }) => {
      const params: Record<string, unknown> = { page: pageParam };

      if (dateRange[0]) {
        params.start_date = dateRange[0];
      }

      if (dateRange[1]) {
        params.end_date = dateRange[1];
      }

      return fetchInspectionFiles({ params });
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

  return (
    <>
      <PageTitle value="Inspection Images" />

      <StyledRow gutter={[16, 16]}>
        <Col sm={24} lg={12} xl={8}>
          <Typography.Text strong>Filter by date</Typography.Text>

          <DatePicker.RangePicker
            value={dateRangeFormatted}
            disabledDate={(current) => current > dayjs()}
            format="DD MMM YYYY"
            onChange={(_, dates) => {
              setDateRange(dates);
            }}
          />
        </Col>
      </StyledRow>

      {queryFiles.data?.pages[0].pagination.total_page === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <Row gutter={[16, 16]}>
        {queryFiles.data?.pages.map((group) => {
          return group.files.map((file) => {
            return (
              <Col key={file._id} {...COL_PROPS} xxl={4}>
                <Suspense
                  fallback={
                    <Flex justify="center">
                      <Spin />
                    </Flex>
                  }
                >
                  <ImageCard file={file} />
                </Suspense>
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
