import {eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth} from "date-fns";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function Calendar() {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    });
    const startingDayIndex = getDay(firstDayOfMonth);
    const lastDayIndex = getDay(lastDayOfMonth);

    return (
        <div className="container mx-auto pt-8">
            <div className="mb-4">
                <h2 className="text-center text-4xl uppercase font-bold">{format(currentDate, "MMMM yyyy")}</h2>
            </div>
            <div className="grid grid-cols-7">
                {WEEKDAYS.map((day) => {
                    return <div key={day} className="font-bold text-center px-2 py-6 border"><span>{day}</span></div>
                })}
                {Array.from({length: startingDayIndex - 1}).map((_, index) => {
                    return <div key={`empty-start-${index}`} className="px-2 py-10 hover:bg-sky-600 border"></div>
                })}
                {daysInMonth.map((day, index) => {
                    return <div key={index}
                                className={`font-medium relative px-2 py-10 hover:bg-sky-600 hover:text-gray-900 cursor-pointer transition border ${isToday(day) ? 'text-gray-900 bg-sky-600' : 'text-indigo-100'}`}
                    >
                        <span className="absolute bottom-2 right-2">{format(day, "d")}</span>
                    </div>
                })}
                {Array.from({length: lastDayIndex ? 7 - lastDayIndex : 0}).map((_, index) => {
                    return <div key={`empty-end-${index}`} className="px-2 py-10 hover:bg-sky-600 border"></div>
                })}
            </div>
        </div>
    )
}

export default Calendar;