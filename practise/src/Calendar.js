import React, { useState, useMemo } from "react";
import "./Calendar.css";

// 1. Memoized data builder to prevent recalculation on every render
const buildMonthData = (days) => {
  return Array.from({ length: days }, (_, index) => ({
    events: [],
    day: index + 1, // Calendar days usually start at 1
  }));
};

const Day = ({ data, index, isSelected }) => {
  return (
    <div id={index} className={`day ${isSelected ? "selected" : ""}`}>
      <div className="day-number">{data.day}</div>
      <div className="event-list">
        {data.events.map((event, i) => (
          <div key={i} className="event-tag">
            {event.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const Calendar = () => {
  const [numDays] = useState(31);
  const [dayInfo, setDayInfo] = useState(() => buildMonthData(numDays));
  const [selectDay, setSelectedDay] = useState(null); // This will be a Number
  const [addingEvent, setAddingEvent] = useState(false);
  const [formState, setFormState] = useState({ name: "", date: "" });

  const clickHandler = (ev) => {
    // Event delegation: find the closest element with the 'day' class
    const dayEl = ev.target.closest(".day");
    if (!dayEl) return;

    setSelectedDay(Number(dayEl.id));
  };

  const saveEvent = (ev) => {
    ev.preventDefault();

    // Using functional update and structuredClone for deep immutability
    setDayInfo((prev) => {
      const next = structuredClone(prev);
      next[selectDay].events.push({ ...formState });
      return next;
    });

    setAddingEvent(false);
    setFormState({ name: "", date: "" }); // Reset form
  };

  return (
    <div className="calendar-wrapper">
      <div className="container" onClick={clickHandler}>
        {dayInfo.map((data, index) => (
          <Day
            key={index}
            data={data}
            index={index}
            isSelected={index === selectDay}
          />
        ))}
      </div>

      <div className="controls">
        {addingEvent ? (
          <form onSubmit={saveEvent}>
            <input
              required
              name="name"
              placeholder="Event Name"
              value={formState.name}
              onChange={(e) =>
                setFormState((p) => ({ ...p, name: e.target.value }))
              }
            />
            <input
              required
              name="name"
              type="time"
              placeholder="Event Name"
              value={formState.name}
              onChange={(e) =>
                setFormState((p) => ({ ...p, name: e.target.value }))
              }
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setAddingEvent(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <button
            disabled={selectDay === null}
            onClick={() => setAddingEvent(true)}
          >
            Add Event to Day {selectDay !== null ? selectDay + 1 : ""}
          </button>
        )}
      </div>
    </div>
  );
};

export default Calendar;
