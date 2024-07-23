import schedule from "../../Views/JadwalNikah/Data";

// src/lib/Utils/Utils.js

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', options).format(date); // 'id-ID' for Indonesian locale
  };
  
  export const isDateTimeAvailable = (date, time) => {
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const newTimeInMinutes = timeToMinutes(time);

    const timeRange = 60;

    for (let entry of schedule) {
      if (entry.date === date) {
        const existingTimeInMinutes = timeToMinutes(entry.time);

        if (Math.abs(newTimeInMinutes - existingTimeInMinutes) < timeRange) {
          return false;
        }
      }
    }

    return true;
  };