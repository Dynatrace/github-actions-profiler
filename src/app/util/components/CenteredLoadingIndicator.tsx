import { Flex, ProgressCircle, ProgressCircleProps } from '@dynatrace/strato-components-preview';

type Props = {
  /** The height of the chart.
   * @defaultValue 300px
   */
  height?: string;
} & ProgressCircleProps;

/**
 * A component to show a centered loading indicator with some space around.
 * Helpful for loading states of components with fixes sizes, e.g. for the charts layed out in a grid.
 */
export const CenteredLoadingIndicator = ({ height = '300px', ...rest }: Props) => {
  return (
    <Flex justifyContent='center' alignItems='center' height={height}>
      <ProgressCircle
        {...rest}
        size='small'
        /*TODO: Add a meaningful aria-label for the ProgressCircle element.*/
        aria-label='Description of the ProgressCircle.'
      />
    </Flex>
  );
};
