import React from 'react';
import './App.css';
import { TamagotchiProvider } from './app/StateContext.js';
// import { Status } from './components/Status.js';
import { Health } from './components/Health.js';
import { ActionButtonGroup } from './components/ActionButtonGroup.js';
import { EventCounter } from './components/EventCounter.js';
import { SpriteContainer } from './components/SpriteContainer.js';

export default function App() {

  return (
    <TamagotchiProvider>
        <EventCounter />
        <Health />
        <div className="App" role="main">
          <SpriteContainer />
          <div className="bottomPanel">
            <ActionButtonGroup />
          </div>
        </div>
    </TamagotchiProvider>
  );
}