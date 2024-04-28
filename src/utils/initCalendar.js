import {eachDayOfInterval, endOfMonth, getDay, startOfMonth} from "date-fns";

const initCalendar = (currentDate) => {
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const firstDayIndex = getDay(firstDayOfMonth);
    const lastDayIndex = getDay(lastDayOfMonth);
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    });
    return {
        firstDayOfMonth,
        lastDayOfMonth,
        firstDayIndex,
        lastDayIndex,
        daysInMonth
    }
}

export default initCalendar;