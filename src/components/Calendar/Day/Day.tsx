import { Fragment, useMemo } from "react";
import { diffInHours, formatDate, getHoursOfDay } from "utils/date";
import styles from "./styles.module.css";
import { DayEvent } from "./DayEvent";
import { DataItemInterface } from "../../../interfaces/dataItem.interface";

type DayProps = {
  data: DataItemInterface[];
  day?: Date;
};

export const Day = ({ day = new Date(), data }: DayProps) => {
  const getDataOfDay = (day: Date, tech_id: number) => {
    const nextHour = new Date(day);
    nextHour.setHours(nextHour.getHours() + 1);

    return data.filter((service) => {
      const dateService = new Date(service.service_date_start);

      return (
        dateService.getTime() >= day.getTime() &&
        dateService.getTime() < nextHour.getTime() &&
        service.technician_id === tech_id
      );
    });
  };

  const isHour = (date: Date) => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1);
    const diff = diffInHours(now, date);
    return (
      now.getTime() >= date.getTime() &&
      date.getTime() < nextHour.getTime() &&
      diff === 0
    );
  };

  const technicians = useMemo(() => {
    const techs = data.map((service) => ({
      technician_name: service.technician_name,
      technician_id: service.technician_id,
      technician_charge: service.technician_charge,
      technician_picture: service.technician_picture,
    }));

    return techs.filter(
      (tech, idx) =>
        idx === techs.findIndex((t) => t.technician_id === tech.technician_id)
    );
  }, [data]);

  const hours = useMemo(() => {
    return getHoursOfDay();
  }, []);

  return (
    <div className={styles.day__container}>
      {/* HEADER HOURS */}
      <div className={styles.day__header}>
        <div className={styles.day__technician_header}>
          <span className={styles.day__header_text}>Technicians</span>
        </div>
        {hours.map((hour) => {
          const todayHour = isHour(new Date(`${formatDate(day)} ${hour}`));
          return (
            <div
              key={hour}
              className={`${styles.hour} ${todayHour ? `${styles.today}` : ""}`}
            >
              <span className={styles.day__header_text}>{hour}</span>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className={styles.day__content}>
        {technicians.map((tech) => {
          return (
            <Fragment key={tech.technician_id}>
              <div className={styles.day__technician_content}>
                <img
                  src="https://www.vhv.rs/dpng/d/276-2761771_transparent-avatar-png-vector-avatar-icon-png-png.png"
                  alt="Avatar img"
                />
                <div>
                  <span className={styles.day__tech_name}>
                    {tech.technician_name}
                  </span>
                  <br />
                  <span className={styles.day__tech_charge}>
                    {tech.technician_charge}
                  </span>
                </div>
              </div>
              {hours.map((hour) => {
                const dataOfHour = getDataOfDay(
                  new Date(`${formatDate(day)} ${hour}`),
                  tech.technician_id
                );

                return (
                  <div key={hour} className={styles.day__container_card}>
                    {dataOfHour.map((service) => (
                      <DayEvent
                        key={service.id}
                        service={service}
                        height={100 / dataOfHour.length}
                      />
                    ))}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
