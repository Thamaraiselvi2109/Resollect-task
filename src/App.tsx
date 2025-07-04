import { Provider } from "react-redux"
import { persistor, store } from "./Redux/store"
import { Routing } from "./Routing/Routing"
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
     <Routing/>
     </PersistGate>
    </Provider>
  )
}

export default App
