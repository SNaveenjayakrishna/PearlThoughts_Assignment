import React, { useMemo, useState } from "react";

export default function GenerateCalendar({ datesArray = [], initialDate }) {
  const highlightSet = useMemo(() => new Set(datesArray), [datesArray]);

  const seedDate = useMemo(() => {
    if (initialDate) return new Date(initialDate);
    if (datesArray.length > 0) return new Date(datesArray[0]);
    return new Date();
  }, [initialDate, datesArray]);

  const [displayYear, setDisplayYear] = useState(seedDate.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(seedDate.getMonth()); // 0-11

  const today = new Date();
  const isTodayMonth =
    today.getFullYear() === displayYear && today.getMonth() === displayMonth;

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
    setDisplayMonth((m) => {
      if (m === 0) {
        setDisplayYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const goNext = () => {
    setDisplayMonth((m) => {
      if (m === 11) {
        setDisplayYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  // Build calendar grid data: array of weeks; each week array has 7 cells {dayNumber|null, isoDate|null}
  const weeks = useMemo(() => {
    const firstDayWeekday = new Date(displayYear, displayMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

    const rows = [];
    let day = 1;
    for (let wk = 0; wk < 6; wk++) {
      const weekCells = [];
      for (let wd = 0; wd < 7; wd++) {
        if (wk === 0 && wd < firstDayWeekday) {
          weekCells.push({ dayNumber: null, isoDate: null });
        } else if (day > daysInMonth) {
          weekCells.push({ dayNumber: null, isoDate: null });
        } else {
          const cellDate = new Date(displayYear, displayMonth, day);
          const iso = cellDate.toISOString().split("T")[0];
          weekCells.push({ dayNumber: day, isoDate: iso });
          day++;
        }
      }
      rows.push(weekCells);
      if (day > daysInMonth) break;
    }
    return rows;
  }, [displayYear, displayMonth]);

  // Styles (inline for demo; move to CSS if you like)
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
                  cell.isoDate && highlightSet.has(cell.isoDate);
                const isToday =
                  isTodayMonth &&
                  cell.dayNumber === today.getDate() &&
                  cell.isoDate != null;

                let style = { ...tdStyleBase };
                if (isToday) style = { ...style, ...todayStyle };

                return (
                  <td key={ci} style={style}>
                    {cell.dayNumber != null ? (
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
