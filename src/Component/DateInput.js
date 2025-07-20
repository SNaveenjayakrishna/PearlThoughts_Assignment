import React from "react";

export default function DateInput({ setStartDate, setEndDate }) {
  return (
    <>
      <div className="group">
        <label>Start Time : </label>
        <input
          type="date"
          id="start_date"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="group">
        <label>End Time : </label>
        <input
          type="date"
          id="end_date"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </>
  );
}
