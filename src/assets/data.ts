import moment from "moment";
import { DataItemInterface } from "../interfaces/dataItem.interface";

export const getRandomYear = (base: number = 2000) =>
  Math.floor(base + Math.random() * (base - moment().year()));

export const getRandomMonth = (base: number = 11) =>
  Math.floor(Math.random() * base);

export const getRandomDay = (base: number = 28) =>
  Math.floor(Math.random() * base);

export const getRandomHour = (base: number = 24) =>
  Math.floor(Math.random() * base);

export const getRandomMinutes = (base: number = 60) =>
  Math.floor(Math.random() * base);

export const getRandomDateStart = () => {
  const year: number = Number(getRandomYear(2023));
  // const month: number = Number(getRandomMonth());
  const month: number = Number(moment().month());
  // const day: number = Number(getRandomDay());
  const day: number = Number(moment().date());
  const hour: number = Number(getRandomHour());
  const minute: number = Number(getRandomMinutes());

  return moment(new Date(year, month, day, hour, minute)).format();
};

export const getRandomDateEnd = (startDate: string) => {
  const date = moment(startDate);
  const year: number = date.year();
  // const month: number = date.month();
  const month: number = date.month();
  const day: number = date.date();
  const hour: number = date
    .add(Math.floor(Math.random() * 2), "hours")
    .hour();
  const minute: number = date
    .add(Math.floor(Math.random() * 240), "minutes")
    .minute();

  return moment(new Date(year, month, day, hour, minute)).format();
};

export const getRandomTime = () => `${getRandomHour()}:${getRandomMinutes()}`;

const buildData = (count: number = 24) => {
  let data: DataItemInterface[] = [];

  for (let index: number = 0; index <= count; index++) {
    const dateStart = getRandomDateStart();
    const dateEnd = getRandomDateEnd(dateStart);

    data = [
      ...data,
      {
        id: index,
        technician_name: `Santiago Ruiz ${index}`,
        technician_id: index,
        technician_charge: "Técnico de electricidad",
        technician_picture: null,
        ticket: "2023080200012",
        percentage: Math.floor(Math.random() * 100),
        service_type: "Instalación de bombillo",
        service_status: "in_progress",
        service_date_start: dateStart,
        service_date_end: dateEnd,
      },
    ];
  }

  return data;
};

export const data: DataItemInterface[] = buildData();
