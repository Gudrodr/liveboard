import './App.css';
import styled from 'styled-components';
import { Toolbar } from './toolbar/Toolbar';
import { Canvas } from './canvas/Canvas';
import 'normalize.css';
import { useState } from 'react';

export interface ActionObject {
  currentAction: 'square' | 'circle' | 'clear' | undefined
}

function App() {
  const [state, setState] = useState<ActionObject>({
    currentAction: undefined
  });

  return (
    <AppBody className="App">
      <Toolbar updateAction={setState} />
      <Canvas { ...state } />
    </AppBody>
  );
}

const AppBody = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default App;
