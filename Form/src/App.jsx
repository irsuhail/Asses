import React from 'react';
import { FormBuilderProvider } from './context/FormBuilderContext';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';
import Preview from './components/Preview';

export default function App() {
  return (
    <FormBuilderProvider>
      <div className="app">
        <header className="topbar">
          <h1>Dynamic Form Builder</h1>
        </header>

        <div className="layout">
          <Sidebar />
          <main className="main-area">
            <Canvas />
            <div className="right-panel">
              <FieldEditor />
              <Preview />
            </div>
          </main>
        </div>
      </div>
    </FormBuilderProvider>
  );
}
