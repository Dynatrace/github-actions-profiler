import { useWeeklySuccessRateQuery } from './hooks/useWeeklySuccessRateQuery';
import { ChartContainer } from './ChartContainer';
import { ConclusionTimeseriesChart } from './ConclusionTimeseriesChart';

type Props = {
  workflow: string;
};

export const WeeklySuccessRatesChart = ({ workflow }: Props) => {
  const [weeklySuccessRates, isLoading] = useWeeklySuccessRateQuery(workflow);

  return (
    <ChartContainer heading='Workflow runs per week'>
      <ConclusionTimeseriesChart loading={isLoading} timeseries={weeklySuccessRates?.result || []} variant='bar' />
    </ChartContainer>
  );
};
