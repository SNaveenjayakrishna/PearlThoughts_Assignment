import React, { useState } from "react";
import "./MyForm.css";
import DateInput from "./DateInput";
import RepeatOptions from "./RepeatOptions";
import RepeatEvery from "./RepeatEvery";

export default function MyForm({ onFormSubmit }) {
  const [startDate, setStartDate] = useState("");//startDate is used to store the selected start date
  const [endDate, setEndDate] = useState("");//stores enddate
  const [repeatType, setRepeatType] = useState("");//STores the repeatType
  const [unit, setUnit] = useState("");//stores what to repeat like days or weeks or months or year
  const [repeatInterval, setRepeatInterval] = useState("");//stores number to repeat

  const handleSubmit = (e) => {
    e.preventDefault(); //stops browser reloading
     const formData = {
      startDate,
      endDate,
      repeatType, 
      unit,
      repeatInterval,
    }; //User selected details are stored in one object
    console.log("Form Values:", formData);
if (onFormSubmit) {
      onFormSubmit(formData); //Sends data to app.js
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
