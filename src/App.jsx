import React, { useState } from 'react';
import AppRoutes from './routes';
import Preloader from './components/layout/Preloader';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from './components/ui/sonner';
import { useBubbleHover } from './hooks/useBubbleHover';

const App = () => {
  const [loading, setLoading] = useState(true);
  useBubbleHover();

  return (
    <div>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <AppRoutes />
      </div>
      <Toaster />
      <SonnerToaster position="bottom-right" />
    </div>
  );
};

export default App;
