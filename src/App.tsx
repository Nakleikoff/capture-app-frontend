import './App.css';
import TeammateSelector from './components/teammate-selector/teammate-selector';
import FeedbackForm from './components/feedback-form/feedback-form';
import { useState } from 'react';

function App() {
  const [teammateId, setTeammateId] = useState<number>(0);

  return (
    <>
      <TeammateSelector setTeammateId={setTeammateId} />
      <FeedbackForm teammateId={teammateId} />
    </>
  );
}

export default App;
