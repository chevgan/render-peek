import { useState, useEffect } from 'react';
import { CaseFlashExpected } from './CaseFlashExpected';
import { CaseNoFlash } from './CaseNoFlash';
import { CaseFlashNoOptions } from './CaseFlashNoOptions';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Render Peek Test Suite</h1>
      <p>Parent Count: {count}</p>

      <div style={{ display: 'grid', gap: '20px' }}>
        <CaseFlashExpected
          label="Static Label"
          unstableProp={{ id: Math.random() }}
        />

        <CaseNoFlash count={count} />

        {/* We pass a NEW object reference, but with SAME content */}
        <CaseFlashNoOptions staticObj={{ id: 1 }} />
      </div>
    </div>
  );
}

export default App;
