
export const getHoursOfDay = (): string[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const hours = Array(24)
    .fill(null)
    .map((_, idx) => {
      if (idx === 0) return formatHour(now, "12hours");
      now.setHours(now.getHours() + 1)
      return formatHour(now, "12hours");
    });

    return hours
};

export const formatHour = (
  d?: Date | string | number,
  format?: "24hours" | "12hours"
) => {
  const date = d ? new Date(d) : new Date();
  return date
    .toLocaleTimeString("en-US", {
      hour12: format === "12hours",
      hour: "numeric",
      minute: "numeric",
    })
    .toLowerCase();
};

export const getDaysOfWeek = (firstDate: string | number | Date): Date[] => {
    const date = new Date(firstDate)
    //const days_per_week = 7
    const days = Array(7).fill(null).map((_, idx) => {
        if (idx === 0) return date
        const d = new Date(date)
        d.setDate(date.getDate() + idx)
        return d
    })

    return days
}

export const today = (): Date => new Date()

export const isToday = (date: Date) => {
  const now = today();
  date.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  return date.getTime() === now.getTime()
}

export const formatDate = (d?: string | number | Date): string => {
  const date = d ? new Date(d) : new Date()
  const year = date.getFullYear()
  let day =`${date.getDate()}`
  let month = `${date.getMonth() + 1}`
  day = day.length < 2 ? `0${day}` : day
  month = month.length < 2 ? `0${month}` : month
  return [year, month, day].join('/')
}

export const diffInHours = (date1: Date, date2: Date): number => {
  const hourNow = (date1.getTime() - date2.getTime()) / 1000
  const diff = Math.abs(Math.floor(hourNow / (60 * 60)))
  return diff
}
