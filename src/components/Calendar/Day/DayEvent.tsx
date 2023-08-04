import { useMemo } from "react";
import { ServiceByTechnician } from "types/index";
import { addOpacityToHSL, getRandomColor } from "utils/string";

import styles from './styles.module.css'

type DayEventProps = {
  service: ServiceByTechnician;
  height?: number
};

export const DayEvent = ({ service, height = 100 }: DayEventProps) => {
  const width = useMemo(() => {
    return (service.service_duration * 100) / 60;
  }, [service]);

  const color = useMemo(() => {
    return getRandomColor();
  }, []);

  return (
    <div style={{ width: `${width}%`, background: `${addOpacityToHSL(color)}`, minHeight: `${height}%`, left: `${service.service_time.slice(3)}%` }} className={styles.day__event_container}>
      <div className={styles.day__event_progress} style={{ width: `${service.percentage}%`, background: color }} >
        <span className={styles.day__event_progress_percentage}>{service.percentage}%</span>
      </div>
    </div>
  );
};
