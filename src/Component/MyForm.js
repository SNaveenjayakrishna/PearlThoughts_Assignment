import React, { useState } from "react";
import "./MyForm.css";
import DateInput from "./DateInput";
import RepeatOptions from "./RepeatOptions";
import RepeatEvery from "./RepeatEvery";

export default function MyForm({ onFormSubmit }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeatType, setRepeatType] = useState("");
  const [unit, setUnit] = useState("");
  const [repeatInterval, setRepeatInterval] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
     const formData = {
      startDate,
      endDate,
      repeatType, 
      unit,
      repeatInterval,
    }; 
    console.log("Form Values:", formData);
if (onFormSubmit) {
      onFormSubmit(formData); // Call only if parent provides this function
    } 


  
  };

  return (
    <div className="formdata">
      <form onSubmit={handleSubmit}>
        <DateInput setStartDate={setStartDate} setEndDate={setEndDate} />
        <RepeatOptions setRepeatType={setRepeatType} />
        <RepeatEvery
          setUnit={setUnit}
          repeatInterval={repeatInterval}
          setRepeatInterval={setRepeatInterval}
        />
        <div className="group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
