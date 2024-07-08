import { useState } from 'react';
import { Flex, Heading, List, Page, AppHeader, ExternalLink, Grid, Text } from '@dynatrace/strato-components-preview';
import { ChartsLayout } from './charts/ChartsLayout';
import { useCheckForData } from './data_import/useCheckData';
import { WhatsNext } from './demo/WhatsNext';
import { SideBarContent } from './demo/SideBarContent';
import { GetNotifiedCard } from './cards/GetNotifiedCard';
import { GithubIngesterActionCard } from './cards/GithubIngesterActionCard';
import { InitialDataImportSelector } from './data_import/InitialDataImportSelector';

export const App = () => {
  const [dismissed, setDismissed] = useState(false);
  const { isDataReady, state, ingestData, refetch } = useCheckForData();

  return (
    <Page>
      <Page.Header>
        <AppHeader />
      </Page.Header>
      <Page.Main>
        <Flex justifyContent='center' width='100%'>
          <Flex flexDirection='column' padding={32} gap={16} maxWidth='960px'>
            <Heading>GitHub Actions Profiler Sample</Heading>
            <Text>
              The GitHub Actions Profiler analyzes data generated by GitHub Actions workflows and provides insights into
              their performance and efficiency. Through analyzing the workflows, teams can identify bottlenecks and
              optimize processes to improve build times, reduce errors, and increase efficiency.
            </Text>
            <Heading as='h2' level={4}>
              This app demonstrates
            </Heading>
            <List ordered={false}>
              <Text>How business events can be used to analyze GitHub Actions workflows</Text>
              <Text>How notifications can be triggered by business events</Text>
              <Text>How to fetch data with Dynatrace Query Language (DQL)</Text>
              <Text>
                How to create data visualizations using{' '}
                <ExternalLink href='https://developer.dynatrace.com/reference/design-system/'>
                  Strato design system
                </ExternalLink>
              </Text>
            </List>
            <Grid gridTemplateColumns='repeat(auto-fit, minmax(320px, 1fr))' gap={16}>
              {!isDataReady ? (
                <InitialDataImportSelector
                  dataImportState={state}
                  onImportButtonClick={ingestData}
                  onRefetch={refetch}
                />
              ) : (
                <GetNotifiedCard />
              )}
              <GithubIngesterActionCard />
            </Grid>
          </Flex>
        </Flex>
        {/* If there is no data yet in Grail, we show a UI with options how to ingest sample or real data */}
        {isDataReady ? <ChartsLayout /> : null}
        <WhatsNext />
      </Page.Main>
      <Page.DetailView
        dismissed={dismissed}
        onDismissChange={(value) => {
          setDismissed(value);
        }}
      >
        <SideBarContent onClose={() => setDismissed(true)} />
      </Page.DetailView>
    </Page>
  );
};
