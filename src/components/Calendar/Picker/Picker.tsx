import { useGetCalendar } from "hooks/useGetCalendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import styles from "./styles.module.css";
import { WEEK_DAY_EN } from "constants/days";
import { today } from "utils/date";
import { useState } from "react";
import { IconButton } from "components/Button";

type PickerProps = {
    date: Date
}

export const Picker = () => {
  const [datePicker, setDatePicker] = useState<Date>(new Date());

  const { days, dayWeekFirstDate, monthName } = useGetCalendar(datePicker);

  const handleNextMonth = () => {
    const d = datePicker
    setDatePicker(new Date(d.setMonth(d.getMonth() + 1)))
  }

  const handleBackMonth = () => {
    const d = datePicker
    setDatePicker(new Date(d.setMonth(d.getMonth() + -1)))
  }

  return (
    <div className={styles.picker__calendar_container}>
      <div className={styles.picker__calendar_header}>
        <IconButton icon={<IoIosArrowBack size={17} />} onClick={handleBackMonth} />
        <span className={styles.picker__calendar_header_month}>
          {monthName} {datePicker.getFullYear()}
        </span>
        <IconButton icon={<IoIosArrowForward size={17} />} onClick={handleNextMonth} />
      </div>
      <div className={styles.picker__calendar_content}>
        {WEEK_DAY_EN.map((day) => (
          <div key={day} className={styles.picker__calendar_day_week}>
            <span>{day}</span>
          </div>
        ))}
        {days.map((day, idx) => {
          const dayNumber = day + 1;
          const selectedDate = datePicker;
          selectedDate.setHours(0, 0, 0, 0);
          const now = today();
          now.setHours(0, 0, 0, 0);
          const isToday =
            now.getTime() === selectedDate.getTime() &&
            now.getDate() === dayNumber;
          return (
            <div
              key={day}
              style={{ gridColumnStart: idx === 0 ? dayWeekFirstDate : 0 }}
              className={`${styles.picker__calendar_day} ${
                isToday ? styles.today : ""
              }`}
            >
              <span>{dayNumber}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
