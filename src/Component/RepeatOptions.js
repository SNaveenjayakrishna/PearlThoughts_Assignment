import React from "react";

export default function RepeatOptions({ setRepeatType }) {
  return (
    <div className="group">
      <label>Repeat : </label>
      <div className="radiobtn">
        <input
          type="radio"
          id="daily"
          name="repeat"
          value="Daily"
          onChange={(e) => setRepeatType(e.target.value)}
        />
        <label htmlFor="daily">Daily</label>
      </div>
      <div className="radiobtn">
        <input
          type="radio"
          id="weekly"
          name="repeat"
          value="Weekly"
          onChange={(e) => setRepeatType(e.target.value)}
        />
        <label htmlFor="weekly">Weekly</label>
      </div>
      <div className="radiobtn">
        <input
          type="radio"
          id="monthly"
          name="repeat"
          value="Monthly"
          onChange={(e) => setRepeatType(e.target.value)}
        />
        <label htmlFor="monthly">Monthly</label>
      </div>
      <div className="radiobtn">
        <input
          type="radio"
          id="yearly"
          name="repeat"
          value="Yearly"
          onChange={(e) => setRepeatType(e.target.value)}
        />
        <label htmlFor="yearly">Yearly</label>
      </div>
    </div>
  );
}
