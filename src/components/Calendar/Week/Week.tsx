import { EN_DAYS } from "constants/days";
import { Fragment, useMemo } from "react";
import { nanoid } from "nanoid";
import { getDaysOfWeek, getHoursOfDay, isToday } from "utils/date";
import { uppercaseFirstLetter } from "utils/string";

import styles from "./styles.module.css";
import { CardEvent } from "components/Calendar/Week/CardEvent";
import { DataItemInterface } from "../../../interfaces/dataItem.interface";
import moment from "moment";

type WeekProps = {
  firstDateOfWeek: Date;
  data: DataItemInterface[];
};

export const Week = ({ firstDateOfWeek, data }: WeekProps) => {
  const getDataOfDay = (date: Date) => {
    const currentDate = moment(new Date(date));

    return data.filter((data) => {
      const dateService = moment(new Date(data.service_date_start));
      const hourFrom = dateService.hour();
      const hourTo = currentDate.hour();
      const dayFrom = dateService.day();
      const dayTo = currentDate.day();
      const monthFrom = dateService.month();
      const monthTo = currentDate.month();
      const yearFrom = dateService.year();
      const yearTo = currentDate.year();

      const isValid =
        yearFrom == yearTo &&
        monthFrom == monthTo &&
        dayFrom === dayTo &&
        hourFrom === hourTo;

      return isValid;
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
            {daysWeek.map((date) => {
              const dataOfDay = getDataOfDay(date);

              return (
                <div
                  key={nanoid()}
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
