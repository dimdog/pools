import {DataProvider} from './components/DataProvider';
import {Base} from './Base';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Base />
      </DataProvider>
    </div>
  );
}

export default App;
