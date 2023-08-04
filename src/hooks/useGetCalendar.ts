import { uppercaseFirstLetter } from "utils/string";

type Calendar = {
    monthName: string
    days: number[]
    dayWeekFirstDate: number
}

export const useGetCalendar = (date: Date): Calendar => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const intlMonth = new Intl.DateTimeFormat("en-US", { month: "long" });

  const monthName = uppercaseFirstLetter(intlMonth.format(new Date(year, month)))
  const nextMonth = (month + 1) % 12;
  const totalDays = new Date(date.getFullYear(), nextMonth, 0).getDate();
  const dayWeekFirstDate = new Date(year, month, 1).getDay() + 1

  const days = [...Array(totalDays).keys()]

  return {
    monthName,
    days,
    dayWeekFirstDate
  }
};
