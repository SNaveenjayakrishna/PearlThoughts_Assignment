import React, { useMemo, useState } from "react";

export default function GenerateCalendar({ datesArray = [], initialDate }) {
  const highlightSet = useMemo(() => new Set(datesArray), [datesArray]);
//stores the initial date
  const seedDate = useMemo(() => {
    if (initialDate) return new Date(initialDate);
    if (datesArray.length > 0) return new Date(datesArray[0]);
    return new Date();
  }, [initialDate, datesArray]);

  const [displayYear, setDisplayYear] = useState(seedDate.getFullYear());// Gets the initial year
  const [displayMonth, setDisplayMonth] = useState(seedDate.getMonth()); // Gets the initial month

  const today = new Date();
  const isTodayMonth =
    today.getFullYear() === displayYear && today.getMonth() === displayMonth;//STores whether the start date is todays date

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goPrev = () => {
    setDisplayMonth((m) => {//moves to previous month
      if (m === 0) {
        setDisplayYear((y) => y - 1);// if the current month is January then decreases the year by 1 and returns the month as December(index value 11)
        return 11;
      }
      return m - 1;//if not jan then decrease the monthy alnoe by 1
    });
  };

  const goNext = () => {
    setDisplayMonth((m) => { //moves to next month
      if (m === 11) {
        setDisplayYear((y) => y + 1); // at december increases the year by 1 and return january's index value 0
        return 0;
      }
      return m + 1; // if not december just increment the month index by 1
    });
  };

  // Build calendar grid data: array of weeks; each week array has 7 cells {dayNumber|null, isoDate|null}
  const weeks = useMemo(() => {
    const firstDayWeekday = new Date(displayYear, displayMonth, 1).getDay(); //gets the first day of the initial month
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();//gets the no. of days in the initial month

    const rows = [];//it stores the weeks
    let day = 1;//it tracks the days
    
    for (let wk = 0; wk < 6; wk++) {
      const weekCells = [];//stores 7 days
      for (let wd = 0; wd < 7; wd++) {
        if (wk === 0 && wd < firstDayWeekday) { // checks for the day is starting day in the first week 
          weekCells.push({ dayNumber: null, isoDate: null });//adds empty cell
        } else if (day > daysInMonth) { //checks whether the number of days is greater than the days in the month
          weekCells.push({ dayNumber: null, isoDate: null });//adds empty cell
        } else {
          const cellDate = new Date(displayYear, displayMonth, day);//Creates the specific day for the current date (day) to be added
          const iso = cellDate.toISOString().split("T")[0];//converts the date to the format "YYYY-MM-DD"
          weekCells.push({ dayNumber: day, isoDate: iso }); //adds the day
          day++;//increments the day after adding to the calendar
        }
      }
      rows.push(weekCells); //adds the week to the row 
      if (day > daysInMonth) break; // if the day goes beyond the number of days in the month just break the loop
    }
    return rows;
  }, [displayYear, displayMonth]);// the above calculation of weeks only runs when Display month and year changes

  // Styles 
  const tableStyle = {
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundImage:
      "url('https://img.freepik.com/free-vector/watercolor-abstract-floral-background_52683-134424.jpg?semt=ais_hybrid&w=740')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
  };

  const thStyle = {
    backgroundColor: "#b4aeae",
    border: "1px solid #000",
    width: "50px",
    height: "50px",
    textAlign: "center",
    padding: "5px",
  };
  const tdStyleBase = {
    border: "1px solid #000",
    width: "50px",
    height: "50px",
    textAlign: "center",
    padding: "5px",
    verticalAlign: "middle",
    position: "relative",
  };
  const captionStyle = {
    backgroundColor: "#828080",
    padding: "7px",
  };
  const buttonStyle = {
    padding: "5px 10px",
    margin: "0 5px",
    cursor: "pointer",
  };
  const highlightStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    width: "28px",
    height: "28px",
    lineHeight: "28px",
  };
  const todayStyle = {
    backgroundColor: "antiquewhite",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "-10px",
        }}
      >
        <img
          src="/Images/spiral.jpg"
          alt="spiral"
          style={{
            width: "90%",
            maxWidth: "700px",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      <table className="calendar" style={tableStyle}>
        <caption style={captionStyle}>
          <button type="button" onClick={goPrev} style={buttonStyle}>
            &lt;
          </button>
          <span>
            <strong>
              {monthNames[displayMonth]} {displayYear}
            </strong>
          </span>
          <button type="button" onClick={goNext} style={buttonStyle}>
            &gt;
          </button>
        </caption>
        <thead>
          <tr>
            <th style={thStyle}>Sun</th>
            <th style={thStyle}>Mon</th>
            <th style={thStyle}>Tue</th>
            <th style={thStyle}>Wed</th>
            <th style={thStyle}>Thu</th>
            <th style={thStyle}>Fri</th>
            <th style={thStyle}>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((cell, ci) => {
                const isHighlighted =
                  cell.isoDate && highlightSet.has(cell.isoDate);//checks for the valid date and the date need to be highlighted or not
                const isToday =
                  isTodayMonth &&
                  cell.dayNumber === today.getDate() &&
                  cell.isoDate != null;//checks for the current month ,isTodayMonth (i.e whether it is a current month or not checked in the beggining) and current day and the cell is a valid date
//... is a spreadoperator that is used to create a copy rather than pointing to the same element.
                let style = { ...tdStyleBase };//tdStyleBase is an object that contains style for the table cell
                if (isToday) style = { ...style, ...todayStyle };//If the current cell is today, then merge the todayStyle object into the style object

                return (
                  <td key={ci} style={style}> //
                    {cell.dayNumber != null ? ( //checks the cell has a valid day
                      isHighlighted ? (
                        <span style={highlightStyle}>{cell.dayNumber}</span>
                      ) : (
                        <strong>{cell.dayNumber}</strong>
                      )
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
