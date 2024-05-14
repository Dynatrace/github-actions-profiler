import { ChartVariant, Timeseries, TimeseriesChart, Text } from '@dynatrace/strato-components-preview';
import { Spacings } from '@dynatrace/strato-design-tokens';
import { COLOR_CANCELLED, COLOR_FAILURE, COLOR_SUCCESS } from './ChartColorPalette';
import React from 'react';

interface ConclusionTimeseriesChartProps {
  timeseries: Timeseries[];
  variant: ChartVariant;
  loading: boolean;
}

function getTimeseriesChartComponent(
  variant: ChartVariant,
): typeof TimeseriesChart.Line | typeof TimeseriesChart.Bar | typeof TimeseriesChart.Area {
  if (variant === 'bar') {
    return TimeseriesChart.Bar;
  } else if (variant === 'area') {
    return TimeseriesChart.Area;
  } else {
    return TimeseriesChart.Line;
  }
}

export const ConclusionTimeseriesChart = ({ timeseries, variant, loading }: ConclusionTimeseriesChartProps) => {
  const successTimeseries = timeseries.find((t) => t.name.includes('success'));
  const failureTimeseries = timeseries.find((t) => t.name.includes('failure'));
  const cancelledTimeseries = timeseries.find((t) => t.name.includes('cancelled'));
  const TimeseriesChartComponent = getTimeseriesChartComponent(variant);
  return timeseries.length > 0 || loading ? (
    <TimeseriesChart
      variant={variant}
      loading={loading}
      style={{ padding: Spacings.Size8, boxSizing: 'border-box' }}>
      {successTimeseries && <TimeseriesChartComponent data={successTimeseries} color={COLOR_SUCCESS} />}
      {failureTimeseries && <TimeseriesChartComponent data={failureTimeseries} color={COLOR_FAILURE} />}
      {cancelledTimeseries && <TimeseriesChartComponent data={cancelledTimeseries} color={COLOR_CANCELLED} />}
    </TimeseriesChart>
  ) : (
    <Text textStyle="base">No data available</Text>
  );
};
