import React from 'react';
import './App.css';
import { TamagotchiProvider } from './app/StateContext.js';
import { Status } from './components/Status.js';
import { Health } from './components/Health.js';
import { ActionButtonGroup } from './components/ActionButtonGroup.js';
import { EventCounter } from './components/EventCounter.js';
import { SpriteContainer } from './components/SpriteContainer.js';

export default function App() {

  return (
    <TamagotchiProvider>
      <div className="App">
        <EventCounter />
        <SpriteContainer />
        <Status />
        <Health />
        <ActionButtonGroup />
      </div>
    </TamagotchiProvider>
  );
}