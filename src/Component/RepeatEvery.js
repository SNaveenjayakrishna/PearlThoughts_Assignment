import React from "react";

export default function RepeatEvery({
  unit,
  setUnit,
  repeatInterval,
  setRepeatInterval,
}) {
  return (
    <div className="repeat_every">
      <div className="group">
        <label>Repeat Every : </label>
        <input
          type="number"
          id="repeat_interval"
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(e.target.value)}
        />
      </div>
      <div className="group">
        <label></label>
        <select
          id="repeat_unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          defaultValue=""
        >
          <option value=""></option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
      </div>
    </div>
  );
}
