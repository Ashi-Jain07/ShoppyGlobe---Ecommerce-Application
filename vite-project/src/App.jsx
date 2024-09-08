import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux"

function App() {
  return (
    <>
      {/* Provide store to application using Provider */}
      <Provider store={appStore}>
        <Header />
        <Outlet />
      </Provider>
    </>
  )
}

export default App
