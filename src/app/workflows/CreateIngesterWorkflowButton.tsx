import { IntentPayload, sendIntent } from '@dynatrace-sdk/navigation';
import { Button } from '@dynatrace/strato-components-preview/buttons';
import { CollectFromGithubRepositoryWorkflowScript } from './CollectFromGithubRepositoryWorkflowScript';
import { ExpandableText } from '@dynatrace/strato-components-preview/content';
import { Code, Paragraph, Strong } from '@dynatrace/strato-components-preview/typography';
import { Flex } from '@dynatrace/strato-components-preview';

/**
 * This component demonstrates how you can create a dynatrace workflow from within your app.
 * Pressing the CreateIngesterWorkflowButton will open the Dynatrace Automation Workflow App with a workflow
 * that fetches data from GitHubs REST API and writes them as business events into Grail.
 *
 * */
export default function CreateIngesterWorkflowButton() {
  const payload: IntentPayload = {
    automation: {
      workflow: {
        title: 'Aggregate success rates of previous day',
        tasks: {
          collectGithubWorkflows: {
            name: 'collectGithubWorkflows',
            action: 'dynatrace.automations:run-javascript',
            input: {
              script: CollectFromGithubRepositoryWorkflowScript,
            },
          },
        },
      },
      trigger: {
        schedule: {
          trigger: {
            type: 'time',
            time: '09:00',
          },
        },
      },
    },
  };

  return (
    <Flex gap={6} flexDirection='column' alignItems='flex-start'>
      <Paragraph>
        Set up a workflow that collects data from a github repository of your choice.
        <ExpandableText>
          <section>
            <Strong>Dynatrace Automations</Strong> lets you create workflows on the fly. Here we create a workflow that
            collects data from GitHub's REST API.
          </section>
          <section>
            To use this workflow, you need to press the button above, and then
            <Strong> enter your github credentials</Strong> into the&nbsp;
            <Code>collectGithubWorkflows</Code> task.
          </section>
        </ExpandableText>
      </Paragraph>
      <Button
        variant='accent'
        color='primary'
        onClick={() => {
          sendIntent(payload, 'dynatrace.automations', 'create-new-automation');
        }}
      >
        Ingest a github repo
      </Button>
    </Flex>
  );
}
