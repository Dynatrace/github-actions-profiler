import { EVENT_TYPE } from '../../util/constants';
import { v4 as uuidv4 } from 'uuid';

export type SampleDataOptions = {
  eventType?: string;
  maxRunsPerDay?: number;
  numberOfDays?: number;
};

/**
 * This is the data about a github action run that we will store
 * as a business event.
 *
 * GitHub's API for GitHub Actions actually returns a lot more details for
 * each run. For this demo, we only store the data we need.
 */
type WorkflowRun = {
  id: string;
  name: string;
  conclusion: string;
  run_started_at: Date;
  updated_at: Date;
  repository: string;
};

/**
 * This is the business event we will store in Grail.
 */
export type BizEvent = {
  specversion: string;
  id: string;
  type: string;
  source: string;
  data: WorkflowRun;
};

/**
 * We want to simulate `numberOfDaysToIngest` days full of workflow data.
 * For each day, we create a random set of action runs.
 */
export function createRandomBizEvents({
  eventType = EVENT_TYPE,
  maxRunsPerDay = 50,
  numberOfDays = 30,
}: SampleDataOptions): BizEvent[] {
  return createRandomGitHubActions({ numberOfDays, maxRunsPerDay }).map((run) => {
    return {
      specversion: '1.0',
      id: `demobatch_run_${uuidv4()}`,
      type: eventType,
      source: 'github-actions-profiler',
      data: {
        ...run,
        run_duration_ms: run.updated_at.getTime() - run.run_started_at.getTime(),
      },
    };
  });
}

function createRandomGitHubActions(options: { numberOfDays: number; maxRunsPerDay: number }): WorkflowRun[] {
  /**
   * For every day, we generate a random couple of workflow runs
   */
  const runsForADay = (day: Date) => {
    return [...Array(randomBetween(0, options.maxRunsPerDay - 1))].map(() => {
      day.setHours(randomBetween(0, 23));
      day.setMinutes(randomBetween(0, 59));
      day.setSeconds(randomBetween(0, 59));
      return createWorkflowRun(day);
    });
  };
  const numberOfDaysToIngest = options.numberOfDays;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numberOfDaysToIngest);

  let data: WorkflowRun[] = [];
  [...Array(numberOfDaysToIngest)].map(() => {
    data = data.concat(runsForADay(startDate));
    startDate.setDate(startDate.getDate() + 1);
  });
  return data;
}

function createWorkflowRun(startDate: Date): WorkflowRun {
  const workflowName = randomItem(['build', 'tests', 'codeql-analysis', 'publish'], [0.35, 0.35, 0.25, 0.05]);
  const started = startDate;
  const updated = new Date(started.getTime() + randomBetween(1000, 1000 * 60 * 10));
  return {
    id: `demo-run-${workflowName}-${uuidv4()}`,
    name: workflowName,
    conclusion: randomItem(['success', 'failure', 'cancelled'], [0.85, 0.1, 0.05]),
    run_started_at: new Date(started.getTime()),
    updated_at: new Date(updated.getTime()),
    repository: '{"full_name" : "demo"}',
  };
}

function randomBetween(minInclusive: number, maxInclusive: number) {
  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
}

function randomItem(items: string[], weights: number[]) {
  let i;
  for (i = 1; i < weights.length; i++) {
    weights[i] += weights[i - 1];
  }
  const random = Math.random() * weights[weights.length - 1];
  for (i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      break;
    }
  }
  return items[i];
}
