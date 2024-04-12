import React from "react";
import Calendar from "../Calendar/Calendar.jsx";
import AppDataProvider from "../../context/App/AppDataProvider.jsx";

function App() {
  return (
      <AppDataProvider>
        <Calendar/>
      </AppDataProvider>
  )
}

export default App;