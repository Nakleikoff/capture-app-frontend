import './App.scss';
import TeammateSelector from './components/TeammateSelector/TeammateSelector';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import { useState } from 'react';
import type { Teammate } from './api/teammates';

function App() {
  const [teammate, setTeammate] = useState<Teammate>();

  return (
    <>
      <TeammateSelector setTeammate={setTeammate} />
      {teammate && <FeedbackForm teammate={teammate} />}
    </>
  );
}

export default App;
