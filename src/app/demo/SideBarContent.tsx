import { Button, Heading, Flex, Text } from '@dynatrace/strato-components-preview';
import { ChatIcon, CodeIcon, XmarkIcon } from '@dynatrace/strato-icons';
import { DetailsCard } from './DetailsCard';
import { GithubIcon } from './GithubIcon';

type Props = {
  onClose: () => void;
};

export const SideBarContent = ({ onClose }: Props) => {
  return (
    <Flex flexDirection='column' paddingTop={32} gap={6}>
      <Flex flexDirection='row' justifyContent='space-between'>
        <Heading as='h2' level={4}>
          Ready to develop?
        </Heading>
        <Button aria-label='Close Details' onClick={onClose}>
          <Button.Suffix>
            <XmarkIcon />
          </Button.Suffix>
        </Button>
      </Flex>
      <Flex flexDirection='column' gap={12}>
        <Text textStyle='small'>Learn to write apps with Dynatrace Developer and the Dynatrace Community</Text>
        <DetailsCard
          href='https://dynatrace.dev/'
          icon={<CodeIcon />}
          title='Learn to create apps'
          text='Dynatrace Developer shows you how'
        />
        <DetailsCard
          href='https://community.dynatrace.com/'
          icon={<ChatIcon />}
          title='Join Dynatrace Community'
          text='Ask questions, get answers, share ideas'
        />
        <DetailsCard
          href='https://github.com/Dynatrace/github-actions-profiler'
          icon={<GithubIcon />}
          title='Collaborate in GitHub'
          text='Start your own app by cloning it on Github'
        />
      </Flex>
    </Flex>
  );
};
