import { useEffect, useState } from 'react';
import { useDQLQuery } from '../../util/hooks/useDQLQuery';
import { QueryResult } from '@dynatrace-sdk/client-query';
import { DQL_QUERY_TIMESTAMP_OFFSET, EVENT_TYPE } from 'src/app/util/constants';
import { formatDate, format, units } from '@dynatrace-sdk/units';

/**
 * DQL query that returns various statistics about the GitHub Actions workflow.
 *
 * Note that we filter the data first, by EVENT_TYPE as well as by the full name of the selected workflow,
 * which we construct from the repository information and the name of the action, which we got from GitHub.
 *
 * For more on building DQL queries, see https://developer.dynatrace.com/explanation/dynatrace-query-language/
 * */
function query(workflowName: string) {
  return `
fetch bizevents, from:now()-${DQL_QUERY_TIMESTAMP_OFFSET}
| parse repository, "JSON:repository"
| fieldsAdd fullName = concat(repository[full_name],"/",name)
| filter fullName=="${workflowName}" and event.type == "${EVENT_TYPE}"
| fieldsAdd updated_timestamp = toTimestamp(updated_at)
| summarize
            triggered = count(),
            failed = countIf(conclusion == "failure"),
            cancelled = countIf(conclusion == "cancelled"),
            success = countIf(conclusion == "success"),
            success_rate = concat(toString(round((countIf(conclusion == "success") / toDouble(count())) * 100, decimals: 1)), "%"),
            cycle_time_avg = round(avg(run_duration_ms),decimals:1),
            cycle_time_min = min(run_duration_ms),
            cycle_time_max = max(run_duration_ms),
            cycle_time_stddev = stddev(run_duration_ms),
            by: {interval = bin(updated_timestamp, 7d)}
| fieldsAdd week = timeframe(from:interval, to:interval+7d)
| fields week, triggered, failed, cancelled, success, cycle_time_avg, cycle_time_min, cycle_time_max, cycle_time_stddev, success_rate
| sort week desc
| limit 3
`;
}

type WorkflowMetric = {
  metric: string;
  values: string[];
};

type WorkflowMetrics = {
  valueHeadings: string[];
  metrics: WorkflowMetric[];
};

function formatTimestamp(value?: Date) {
  if (value === undefined) {
    return '';
  }
  return formatDate(value, {
    month: 'short',
    day: 'numeric',
  });
}

function isTimeframe(value: unknown): value is { start: Date; end: Date } {
  return value !== null && value !== undefined && value['start'] instanceof Date && value['end'] instanceof Date;
}

function extractMetricValues(records: QueryResult['records'], metric: string): string[] {
  return records
    .map((record) => {
      if (record !== null) {
        return record[metric]?.toString() ?? '';
      }
      return '';
    })
    .reverse();
}

function convertToMetrics(records: QueryResult['records']): WorkflowMetrics {
  const valueHeadings = records
    .map((record) => {
      if (record === null) {
        return '-';
      }
      const week = record.week;
      if (isTimeframe(week)) {
        const start = formatTimestamp(week.start);
        const end = formatTimestamp(week.end);
        return `${start} - ${end}`;
      } else {
        return '-';
      }
    })
    .reverse();

  return {
    valueHeadings,
    metrics: [
      {
        metric: 'Triggered',
        values: extractMetricValues(records, 'triggered'),
      },
      {
        metric: 'Failed',
        values: extractMetricValues(records, 'failed'),
      },
      {
        metric: 'Cancelled',
        values: extractMetricValues(records, 'cancelled'),
      },
      {
        metric: 'Success',
        values: extractMetricValues(records, 'success'),
      },
      {
        metric: 'Success rate',
        values: extractMetricValues(records, 'success_rate'),
      },
      {
        metric: 'Cycle time average',
        values: extractMetricValues(records, 'cycle_time_avg').map((value) =>
          format(parseInt(value), { input: units.time.millisecond, cascade: 3 }),
        ),
      },
      {
        metric: 'Cycle time minimum',
        values: extractMetricValues(records, 'cycle_time_min').map((value) =>
          format(parseInt(value), { input: units.time.millisecond, cascade: 3 }),
        ),
      },
      {
        metric: 'Cycle time maximum',
        values: extractMetricValues(records, 'cycle_time_max').map((value) =>
          format(parseInt(value), { input: units.time.millisecond, cascade: 3 }),
        ),
      },
      {
        metric: 'Cycle time stddev',
        values: extractMetricValues(records, 'cycle_time_stddev').map((value) =>
          format(parseInt(value), { input: units.time.millisecond, cascade: 3 }),
        ),
      },
    ],
  };
}

export const useWorkflowStatsQuery = (workflowName: string): [WorkflowMetrics | undefined, boolean] => {
  const [data, isLoading] = useDQLQuery(query(workflowName));
  const [metrics, setMetrics] = useState<WorkflowMetrics | undefined>();

  useEffect(() => {
    if (!isLoading && data?.records) {
      setMetrics(convertToMetrics(data.records));
    }
  }, [data, isLoading]);

  return [metrics, isLoading];
};
