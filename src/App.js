import React from 'react';
import './App.css';
import { TamagotchiProvider } from './app/StateContext.js';
import { EventProvider } from './app/EventContext.js';
import { Health } from './components/Health.js';
import { Game } from './components/Game.js';

export default function App() {

  return (
    <TamagotchiProvider>
      <EventProvider>
        <Health />
        <div className="App" role="main">
          <Game />
        </div>
      </EventProvider>
    </TamagotchiProvider>
  );
}