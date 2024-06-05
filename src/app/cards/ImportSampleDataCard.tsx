import { Card } from '../util/components/Card';
import { Button, Flex } from '@dynatrace/strato-components-preview';

type Props = {
  onIngest: () => void;
  onRefetch: () => void;
};

export const ImportSampleDataCard = ({ onIngest, onRefetch }: Props) => {
  return (
    <Card
      title='Import Sample Data'
      subtitle='Generate some synthetic data so you can check out the app immediately.'
      content='Sample app data for the last 7 days will be created and ingested into Grail or you can check for newly ingested data.'
      action={
        <Flex>
          <Button variant='accent' color='primary' onClick={onIngest}>
            Import Sample Data
          </Button>
          <Button color='primary' onClick={onRefetch}>
            Refetch ingested data
          </Button>
        </Flex>
      }
    />
  );
};
