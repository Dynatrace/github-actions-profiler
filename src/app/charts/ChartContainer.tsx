import { PropsWithChildren } from 'react';
import { Heading, Surface } from '@dynatrace/strato-components-preview';

type Props = PropsWithChildren<{
  heading: string;
}>;

export const ChartContainer = ({ heading, children }: Props) => {
  return (
    <Surface>
      <Heading level={5}>{heading}</Heading>
      {children}
    </Surface>
  );
};
