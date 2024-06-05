import { Card } from '../util/components/Card';
import { ExternalLink } from '@dynatrace/strato-components-preview';

export const GithubIngesterActionCard = () => {
  return (
    <Card
      title='GitHub Ingester Action'
      subtitle='Use our ingest action to observe your workflows in real-time.'
      content='This action ingests information about a completed GitHub Actions workflow into Dynatrace Grail as a business event.'
      action={
        <ExternalLink href='https://github.com/Dynatrace/github-actions-ingester'>Go to GitHub</ExternalLink>
      }
    />
  );
};
