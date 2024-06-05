import { Card } from '../util/components/Card';
import { CreateNotificationWorkflowButton } from '../workflows/CreateNotificationWorkflowButton';

export const GetNotifiedCard = () => {
  return (
    <Card
      title='Get Notified'
      subtitle='Set up a workflow that sends you a daily slack notification with Dynatrace Workflows.'
      content='In this example, we create a simple workflow that sends you a slack message if one of your GitHub workflows had a success rate lower than 75%  the previous day.'
      action={<CreateNotificationWorkflowButton />}
    />
  );
};
