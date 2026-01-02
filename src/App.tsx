import './App.scss';
import TeammateSelector from './components/TeammateSelector/TeammateSelector';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import { useState } from 'react';
import type { Teammate } from './api/teammates';
import AlertProvider from './context/alert-provider';

function App() {
  const [teammate, setTeammate] = useState<Teammate>();

  return (
    <AlertProvider>
      <TeammateSelector setParentTeammate={setTeammate} />
      {teammate && <FeedbackForm teammate={teammate} />}
    </AlertProvider>
  );
}

export default App;
