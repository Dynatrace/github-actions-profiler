import { AppRoot } from '@dynatrace/strato-components/core';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AppRoot>
    <App />
  </AppRoot>,
);
