import "./App.css"
import TeammateSelector from "./components/teammate-selector/teammate-selector"
import TabsCollection from "./components/tab-group/tab-group"

function App() {
  return (
    <>
      <TeammateSelector />
      <TabsCollection items={[]} />
    </>
  )
}

export default App
