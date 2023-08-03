import { ServiceByTechnician } from "types/index";
import styles from "./styles.module.css";
import { addOpacityToHSL, getRandomColor } from "utils/string";
import { useMemo, useState } from "react";

type CardEventProps = {
  service: ServiceByTechnician;
  width?: number;
};

export const CardEvent = ({ service, width = 100 }: CardEventProps) => {
  const [over, setOver] = useState<boolean>(false)

  const height = (service.service_duration * 100) / 60;
  const color = useMemo(() => {
    return getRandomColor();
  }, []);

  const styleOver = useMemo(() => {
    let percentage = 0
    if (width < 100)
      percentage = 400
    return {
      minWidth: `${over ? percentage + width : width}%`,
      zIndex: over ? 2 : 1,
      transform: `scale(${over ? 1.1 : 1})`,
      height: over ? '100%' : `${height}%`
    }
  }, [over, width, height])

  return (
    <div
      className={`${styles.card__container} ${
        height < 100 || width < 100 ? styles.card__small_size : ""
      }`}
      style={{
        /* height: `${height}%`, */
        background: addOpacityToHSL(color),
        top: `${service.service_time.slice(3)}%`,
        ...styleOver
      }}
      onMouseOver={() => (width < 100 || height < 100 ? setOver(true) : null)}
      onMouseOut={() => setOver(false)}
    >
      {/* PERCENTAGE DIV */}
      <div
        style={{
          width: `${service.percentage}%`,
          position: "absolute",
          height: "5px",
          background: color,
          borderRadius: 10,
        }}
      />
      <div className={styles.card__content}>
        {/* HEADER */}
        <div className={styles.card__header}>
          <img
            src="https://www.vhv.rs/dpng/d/276-2761771_transparent-avatar-png-vector-avatar-icon-png-png.png"
            alt="Avatar img"
          />
          <div
            className={styles.card__content_name}
            style={{ display: !over && width < 100 ? "none" : "block" }}
          >
            <p>{service.ticket}</p>
            <p>{service.technician_name}</p>
          </div>
        </div>
        {/* BODY */}
        <div
          className={`${styles.card__details}`}
          style={{ opacity: width < 100 ? 0 : 1 }}
        >
          <ul>
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
    </div>
  );
};
