import React from "react";
import Calendar from "../Calendar";
import AppDataProvider from "../../context/App/AppDataProvider";

function App() {
  return (
      <AppDataProvider>
          <Calendar/>
      </AppDataProvider>
  )
}

export default App;