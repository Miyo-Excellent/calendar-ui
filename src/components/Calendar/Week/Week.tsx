import { EN_DAYS } from "constants/days";
import { Fragment, useMemo } from "react";
import { formatDate, getDaysOfWeek, getHoursOfDay, isToday } from "utils/date";
import { uppercaseFirstLetter } from "utils/string";

import styles from "./styles.module.css";
import { ServiceByTechnician } from "types/index";
import { CardEvent } from "components/Calendar/Week/CardEvent";

type WeekProps = {
  firstDateOfWeek: Date;
  data: ServiceByTechnician[];
};

export const Week = ({ firstDateOfWeek, data }: WeekProps) => {
  const getDataOfDay = (day: Date) => {
    const nextHour = new Date(day);
    nextHour.setHours(nextHour.getHours() + 1);

    return data.filter((service) => {
      const dateService = new Date(
        `${service.service_date} ${service.service_time}`
      );
      return (
        dateService.getTime() >= day.getTime() &&
        dateService.getTime() < nextHour.getTime()
      );
    });
  };

  const hours = useMemo(() => {
    return getHoursOfDay();
  }, []);

  const daysWeek = useMemo(() => {
    return getDaysOfWeek(firstDateOfWeek);
  }, [firstDateOfWeek]);

  return (
    <div>
      {/* HEADER WEEK */}
      <div className={styles.week__content}>
        <div className={styles.hour__header} />
        {daysWeek.map((day) => {
          let date = `${day.getDate()}`;
          if (date.length < 2) date = `0${day.getDate()}`;
          const classWeekTodayText = isToday(day)
            ? styles.week__today_text
            : "";
          return (
            <div key={date} className={styles.week__day}>
              <span className={`${styles.week__date} ${classWeekTodayText}`}>
                {date}
              </span>
              <p className={`${styles.week__day_name} ${classWeekTodayText}`}>
                {uppercaseFirstLetter(EN_DAYS[day.getDay()])}
              </p>
            </div>
          );
        })}
      </div>
      <div className={styles.hours__content}>
        {hours.map((hour) => (
          <Fragment key={hour}>
            <div className={styles.hour}>
              <span className={styles.hour__text}>{hour}</span>
            </div>
            {daysWeek.map((day) => {
              const date = formatDate(day).concat(` ${hour}`);
              const dataOfDay = getDataOfDay(new Date(date));
              return (
                <div
                  key={`${day} ${hour}`}
                  className={styles.hour__day}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${dataOfDay.length}, 1fr)`,
                  }}
                >
                  {dataOfDay.map((service) => {
                    return (
                      <CardEvent
                        service={service}
                        key={service.id}
                        width={100 / dataOfDay.length}                        
                      />
                    );
                  })}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
