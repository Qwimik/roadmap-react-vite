import {useEffect, useState} from "react";
import {eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, subMonths, addMonths} from "date-fns";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function Calendar() {
    const [activeDate, setActiveDate] = useState(new Date());


    const firstDayOfMonth = startOfMonth(activeDate);
    const lastDayOfMonth = endOfMonth(activeDate);
    const startingDayIndex = getDay(firstDayOfMonth);
    const lastDayIndex = getDay(lastDayOfMonth);
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    });

    const prevMonth = () => {
        setActiveDate(subMonths(activeDate, 1));
    }
    const nextMonth = () => {
        setActiveDate(addMonths(activeDate, 1));
    }

    return (
        <div className="container mx-auto pt-8">
            <div className="mb-4 flex justify-between align-center gap-4">
                <div className="">
                    <button title="Previous month"
                            type="button"
                            className="py-4 px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                            onClick={prevMonth}
                    >
                        {'\<'}
                    </button>
                    <button title="Next month"
                            type="button"
                            className="py-4 px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                            onClick={nextMonth}
                    >
                        {'\>'}
                    </button>
                    <button title="Today"
                            type="button"
                            className="py-4 px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                            onClick={() => {
                                setActiveDate(new Date())
                            }}
                    >
                        <span>Today</span>
                    </button>
                </div>
                <span
                    className="text-center text-4xl uppercase font-bold leading-normal">{format(activeDate, "MMMM - yyyy")}</span>

            </div>
            <div className="grid grid-cols-7">
                {WEEKDAYS.map((day) => {
                    return <div key={day} className="font-bold text-center px-2 py-6 border-[1px] border-gray-500">
                        <span>{day}</span></div>
                })}
                {Array.from({length: startingDayIndex - 1}).map((_, index) => {
                    return <div key={`empty-start-${index}`}
                                className="px-2 py-10 hover:shadow-neon border-[1px] border-gray-500 hover:border-white"></div>
                })}
                {daysInMonth.map((day, index) => {
                    return <div key={index}
                                className={`font-medium relative px-2 py-10 cursor-pointer transition border-[1px] border-gray-500 hover:border-white hover:shadow-neon ${isToday(day) ? 'shadow-neon border-white' : ''}`}
                    >
                        <span className="absolute bottom-2 right-2">{format(day, "d")}</span>
                    </div>
                })}
                {Array.from({length: lastDayIndex ? 7 - lastDayIndex : 0}).map((_, index) => {
                    return <div key={`empty-end-${index}`} className="px-2 py-10 hover:shadow-neon border-[1px] border-gray-500 hover:border-white"></div>
                })}
            </div>
        </div>
    )
}

export default Calendar;