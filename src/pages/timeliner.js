import React from 'react';
import Layout from '@theme/Layout';
import { Timeliner } from '@site/plugins/timeliner-plugin/src/client-modules/timeliner';

function App() {
  return (
    <Layout noFooter description="Images from Editing Timelines">
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Timeliner />
      </main>
    </Layout>
  );
}

export default App;
