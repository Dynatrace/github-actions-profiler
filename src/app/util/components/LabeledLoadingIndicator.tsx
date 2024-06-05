import { Flex, ProgressCircle, ProgressCircleProps, Text } from '@dynatrace/strato-components-preview';

type Props = {
  /**
   * Message to show below the LoadingIndicator
   */
  message: string;
} & ProgressCircleProps;

/**
 * A simple component to render a LoadingIndicator with a message below
 */
export const LabeledLoadingIndicator = ({ message, ...rest }: Props) => {
  return (
    <Flex flexDirection='column' alignItems='center' gap={16}>
      <ProgressCircle
        {...rest}
        size='small'
        /*TODO: Add a meaningful aria-label for the ProgressCircle element.*/
        aria-label='Description of the ProgressCircle.'
      />
      <Text textStyle='base'>{message}</Text>
    </Flex>
  );
};
