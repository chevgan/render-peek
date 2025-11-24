import { useState, useEffect } from 'react';
import { useRenderPeek } from 'render-peek';
import './App.css';

// A component that receives unstable props but ignores them
const ChildComponent = (props: { stableId: string; unstableCallback: () => void }) => {
  const { className } = useRenderPeek(props, {
    ignoreKeys: ['unstableCallback'],
  });

  return (
    <div className={`card ${className}`}>
      <h3>Child Component</h3>
      <p>Stable ID: {props.stableId}</p>
      <p className="hint">
        I receive a new callback every render, but I ignore it.
        <br />
        So I <strong>FLASH</strong> because my relevant props haven't changed!
      </p>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>render-peek Demo</h1>
      <div className="card">
        <h2>Parent Component</h2>
        <p>Count: {count}</p>
        <p className="hint">Re-renders every second</p>
      </div>

      <ChildComponent
        stableId="static-id-123"
        unstableCallback={() => console.log('New callback created')}
      />
    </div>
  );
}

export default App;
