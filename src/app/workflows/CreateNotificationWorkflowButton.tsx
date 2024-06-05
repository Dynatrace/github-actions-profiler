import { IntentPayload, sendIntent } from '@dynatrace-sdk/navigation';
import { Button } from '@dynatrace/strato-components-preview/buttons';
import { sendNotificationOnFailedActionsScript } from './SendNotificationOnFailedActionsScript';

/**
 * This DQL query finds the success rate in percent for each workflow in bizevents.
 *
 * Tip: The most convenient way to create DQL queries that you want to use in your code is is
 * to write and test the query in a Notebook. Then copy the result to your workflow or code.
 *
 * */
const payload: IntentPayload = {
  title: 'Aggregate success rates of previous day',
  tasks: {
    successrate: {
      name: 'successrate',
      action: 'dynatrace.automations:run-javascript',
      input: {
        script: sendNotificationOnFailedActionsScript,
      },
    },
    sendnotification: {
      name: 'sendnotification',
      action: 'dynatrace.slack:slack-send-message',
      input: {
        connection: '',
        channel: 'random',

        message: "success rate is {{result('successrate')}}",
        reactions: 'eyes',
      },
      conditions: {
        custom: "{{result('successrate') <= 75}}",
      },
      predecessors: ['successrate'],
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
};

/**
 * This component renders a button which will use an Intent to create a workflow in your Dynatrace environment.
 *
 * We are creating a workflow with three steps:
 *
 * - A trigger that will start your workflow every morning at 9:00
 * - A task 'successrate' that will send a DQL query to your environment.
 * - A task 'sendnotification', that will send a Slack notification to a channel of your choice.
 *
 * To learn more about Intents, see https://developer.dynatrace.com/explanation/intents/
 * To learn more about Workflows, see https://developer.dynatrace.com/category/workflows/
 * In order to use the Slack-Integration, you need to first install add the integration in the Dynatrace Hub:
 * https://ulc38583.apps.dynatrace.com/ui/apps/dynatrace.hub
 *
 * */
export const CreateNotificationWorkflowButton = () => {
  return (
    <Button color='primary' onClick={() => sendIntent(payload, 'dynatrace.automations', 'create-workflow')}>
      Create workflow
    </Button>
  );
};
