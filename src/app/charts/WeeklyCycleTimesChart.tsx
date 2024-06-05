import { useCycleTimeQuery } from './hooks/useCycleTimeQuery';
import { ChartContainer } from './ChartContainer';
import { ConclusionTimeseriesChart } from './ConclusionTimeseriesChart';

type Props = {
  workflow: string;
};

export const WeeklyCycleTimesChart = ({ workflow }: Props) => {
  const [weeklyCycleTimes, isLoading] = useCycleTimeQuery(workflow);

  return (
    <ChartContainer heading='Average cycle time in minutes per week'>
      <ConclusionTimeseriesChart loading={isLoading} timeseries={weeklyCycleTimes?.result || []} variant='line' />
    </ChartContainer>
  );
};
