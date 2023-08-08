import { useMemo } from "react";
import moment from "moment";
import { addOpacityToHSL, getRandomColor } from "utils/string";

import styles from "./styles.module.css";
import { DayEventPropsInterface } from "../../../interfaces/dayEventProps.interface";

export const DayEvent = ({ service, height = 100 }: DayEventPropsInterface) => {
  const startDate = useMemo(
    () => moment(new Date(service.service_date_start)),
    [service]
  );

  const startDateMinutes = useMemo(() => startDate.minutes, [startDate]);

  const endDate = useMemo(
    () => moment(new Date(service.service_date_end)),
    [service]
  );

  const duration = useMemo(() => {
    return startDate.diff(endDate, "minutes");
  }, [startDate, endDate]);

  const width = useMemo(() => {
    const result = (duration * 100) / 60;

    if (result < 0) return result * -1;

    return result;
  }, [duration]);

  const color = useMemo(() => {
    return getRandomColor();
  }, []);

  const isLate = useMemo(() => endDate <= moment(), [endDate]);

  return (
    <div
      style={{
        width: `${width}%`,
        background: isLate
          ? "rgba(255, 63, 63, 1.0)"
          : `${addOpacityToHSL(color)}`,
        minHeight: `${height}%`,
        left: `${startDateMinutes}%`,
      }}
      className={styles.day__event_container}
    >
      <div
        className={styles.day__event_progress}
        style={{
          width: `${isLate ? 100 : service.percentage}%`,
          background: isLate ? "rgba(0, 0, 0, 0.0)" : color,
          height: "100%",
        }}
      >
        <span className={styles.day__event_progress_percentage}>
          {isLate ? "Atrasado" : `${service.percentage}%`}
        </span>
      </div>
      <div className={styles.day__tooltip}>
        <div
          className={styles.day__event_progress}
          style={{
            width: `${service.percentage}%`,
            background: color,
            height: "4px",
            borderRadius: 6,
          }}
        />
        <ul>
          <li>
            Ticket: <span>{service.ticket}</span>
          </li>
          <li>
            Tipo de Servicio: <span>{service.service_type}</span>
          </li>
          <li>
            Estado: <span>{service.service_status}</span>
          </li>
          <li>
            Porcentaje: <span>{service.percentage}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
