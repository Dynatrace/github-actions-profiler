import { useState } from 'react';
import { Flex, FormField, Grid, Label, SelectV2 } from '@dynatrace/strato-components-preview';
import { WorkflowMetricsTable } from './WorkflowMetricsTable';
import SuccessRateDonutChart from './SuccessRateDonutChart';
import { WeeklyCycleTimesChart } from './WeeklyCycleTimesChart';
import { WeeklySuccessRatesChart } from './WeeklySuccessRatesChart';
import { useWorkflowNamesQuery } from './hooks/useWorkflowNamesQuery';

export const ChartsLayout = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | undefined>();
  const [workflows] = useWorkflowNamesQuery();

  if (selectedWorkflow === undefined && workflows.length > 0) {
    setSelectedWorkflow(workflows[0]);
  }

  return (
    <Flex flexDirection='column'>
      <Flex>
        <FormField>
          <Label>Select a workflow</Label>
          <SelectV2 value={selectedWorkflow} onChange={setSelectedWorkflow}>
            <SelectV2.Content>
              {workflows.map((workflow) => (
                <SelectV2.Option key={workflow} value={workflow}>
                  {workflow}
                </SelectV2.Option>
              ))}
            </SelectV2.Content>
          </SelectV2>
        </FormField>
      </Flex>
      {selectedWorkflow && (
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(320px, 1fr))' gap={16}>
          <Grid gridItem gridColumnStart='span 3'>
            <WorkflowMetricsTable workflow={selectedWorkflow} />
          </Grid>
          <Grid gridItem>
            <SuccessRateDonutChart workflow={selectedWorkflow} />
          </Grid>
          <Grid gridItem gridColumnStart='span 2'>
            <WeeklyCycleTimesChart workflow={selectedWorkflow} />
          </Grid>
          <Grid gridItem gridColumnStart='span 2'>
            <WeeklySuccessRatesChart workflow={selectedWorkflow} />
          </Grid>
        </Grid>
      )}
    </Flex>
  );
};
