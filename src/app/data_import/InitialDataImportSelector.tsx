import { LabeledLoadingIndicator } from '../util/components/LabeledLoadingIndicator';
import { DataImportState } from './useCheckData';
import { ImportSampleDataCard } from '../cards/ImportSampleDataCard';
import { Button } from '@dynatrace/strato-components-preview';
import { Card } from '../util/components/Card';

type Props = {
  dataImportState: DataImportState;
  onImportButtonClick: () => void;
  onRefetch: () => void;
};

export const InitialDataImportSelector = ({ dataImportState, onImportButtonClick, onRefetch }: Props) => {
  switch (dataImportState) {
    case 'not_available':
      return <ImportSampleDataCard onIngest={onImportButtonClick} onRefetch={onRefetch} />;
    case 'checking':
      return <LabeledLoadingIndicator message='Checking if there is data available ...' />;
    case 'importing':
      return <LabeledLoadingIndicator message='Ingesting sample data ...' />;
    case 'processing':
      return <LabeledLoadingIndicator message='Import successful, events are being processed ...' />;
    case 'error':
      return (
        <Card
          title='Import Sample Data'
          content='There was an error ingesting demo data.'
          action={<Button onClick={onImportButtonClick}>Retry</Button>}
        />
      );
    default:
      return null;
  }
};
