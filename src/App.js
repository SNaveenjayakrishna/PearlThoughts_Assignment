import React, { useState } from "react";
import MyForm from "./Component/MyForm";
import RecurringDateGenerator from "./Component/RecurringDateGenerator";

export default function App() {
  const [recurrenceData, setRecurrenceData] = useState(null);

  const handleFormSubmit = (data) => {
    setRecurrenceData(data); 
  };

  return (
    <div>
      <MyForm onFormSubmit={handleFormSubmit} />
      {recurrenceData && (
        <RecurringDateGenerator
          startDate={recurrenceData.startDate}
          endDate={recurrenceData.endDate}
          repeatType={recurrenceData.repeatType}
          interval={recurrenceData.repeatInterval}
          unit={recurrenceData.unit}
        />
      )}
    </div>
  );
}
