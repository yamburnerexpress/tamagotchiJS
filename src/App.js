import React from 'react';
import './App.css';
import useTamagotchi, { TamagotchiProvider } from './app/StateContext.js';
import { Status } from './components/Status.js';
import { Health } from './components/Health.js';
import { ActionButtonGroup } from './components/ActionButtonGroup.js';
import { EventCounter } from './components/EventCounter.js';

export default function App() {
  const { name } = useTamagotchi();

  return (
    <TamagotchiProvider>
      <div className="App">
        <h1>{name}</h1>
        <EventCounter />
        <Status />
        <Health />
        <ActionButtonGroup />
      </div>
    </TamagotchiProvider>
  );
}