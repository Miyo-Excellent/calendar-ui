import { ServiceByTechnician } from "types/index";
import styles from "./styles.module.css";
import { addOpacityToHSL, getRandomColor } from "utils/string";

type CardEventProps = {
  service: ServiceByTechnician;
  style?: React.CSSProperties;
};

export const CardEvent = ({ service }: CardEventProps) => {
  const height = (service.service_duration * 100) / 60;
  const color = getRandomColor();

  return (
    <div
      className={styles.card__container}
      style={{ height: `${height}%`, background: addOpacityToHSL(color) }}
    >
      {/* PERCENTAGE DIV */}
      <div
        style={{
          width: `${service.percentage}%`,
          position: "absolute",
          height: "5px",
          background: color,
          borderRadius: 10
        }}
      />
      <div className={styles.card__content}>
        {/* HEADER */}
        <div className={styles.card__header}>
          <img
            src="https://www.vhv.rs/dpng/d/276-2761771_transparent-avatar-png-vector-avatar-icon-png-png.png"
            alt="Avatar img"
          />
          <div className={styles.card__content_name}>
            <p>{service.ticket}</p>
            <p>{service.technician_name}</p>
          </div>
        </div>
        {/* BODY */}
        <div className={styles.card__details}>
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
