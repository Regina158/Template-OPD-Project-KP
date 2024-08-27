import React, { useState, useEffect } from "react";
import { getKalender } from "../fetch/api";

const KalenderHome = () => {
  const [kalender, setKalender] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeEvents, setActiveEvents] = useState([]);
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]);

  const fetchKalender = async () => {
    try {
      const dataKalender = await getKalender();
      setKalender(dataKalender);
      filterActiveEvents(dataKalender);
      filterCurrentMonthEvents(dataKalender);
    } catch (error) {
      console.log("Failed to fetch kalender data");
    }
  };

  const filterActiveEvents = (events) => {
    const active = events.filter(
      (event) => new Date(event.endDate) >= new Date()
    );
    setActiveEvents(active);
  };

  const filterCurrentMonthEvents = (events) => {
    const currentMonth = currentDate.getMonth();
    const current = events.filter(
      (event) => new Date(event.startDate).getMonth() === currentMonth
    );
    setCurrentMonthEvents(current);
  };

  useEffect(() => {
    fetchKalender();
  }, [currentDate]);

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const today = new Date().getDate();

    let calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();
      calendarDays.push(
        <td
          key={day}
          style={{
            backgroundColor: isToday ? "#ffcc00" : "",
            borderRadius: "50%",
            padding: "5px",
            textAlign: "center",
          }}
        >
          {day}
        </td>
      );
    }

    const rows = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(<tr key={`row-${i / 7}`}>{calendarDays.slice(i, i + 7)}</tr>);
    }

    return rows;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h2 style={{ color: "#0056b3" }}>Kalender Acara</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, marginRight: "20px" }}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button onClick={handlePrevMonth}>&lt;</button>
              <h3 style={{ textAlign: "center", color: "#0056b3", flex: 1 }}>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </h3>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                </tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </table>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            
            <h3 style={{ color: "#0056b3" }}>
              Contemporary Art Gallery vol. 06 "Rumpang, Rimpang, Rampung"
            </h3>
            <p>
              Taman Mini Indonesia Indah (TMII), 17 Agustus - 30 September 2024
            </p>
            <p>
              CultureLab dan Asmara Abigail berkolaborasi dengan Contemporary
              Art Gallery (CAG) TMII menyelenggarakan Pameran Seni bertajuk
              "Rumpang. Rimpang. Rampung: Towards Shifting Perspectives".
            </p>
            <a href="#" style={{ color: "#0056b3" }}>
              Selengkapnya..
            </a>
          </div>
          {/* Repeat for other events */}
        </div>
      </div>
    </div>
  );
};

export default KalenderHome;
