import {useEffect} from "react";
import {format, isToday, subMonths, addMonths} from "date-fns";
import useAppContext from "../../hooks/useAppContext";
import CalendarModal from "../CalendarModal/CalendarModal";
import Button from "../Common/Button";
import initCalendar from "../../utils/initCalendar";
import {fetchPostsApi} from "../../api";

function Calendar() {
    const {
        WEEKDAYS,
        currentDate,
        firstDayIndex,
        lastDayIndex,
        daysInMonth,
        isModalOpen,
        postsDataApp,
        activeDate,
        dispatch
    } = useAppContext();

    useEffect(() => {
        if(postsDataApp.length <= 0) {
            fetchPostsApi().then((res) => {
                dispatch({
                    payload: {
                        postsDataApp: res
                    }
                })
            })
        }
    }, [postsDataApp,activeDate])

    useEffect(() => {
        dispatch({
            payload: initCalendar(currentDate)
        });
    }, [currentDate]);

    const handleNextMonth = () => {
        dispatch({
            payload: {
                currentDate: addMonths(currentDate, 1),
            }
        });
    };

    const handlePrevMonth = () => {
        dispatch({
            payload: {
                currentDate: subMonths(currentDate, 1),
            }
        });
    };

    const handleToday = () => {
        dispatch({
            payload: {
                currentDate: new Date()
            }
        })
    };

    const handleOpenModal = (e) => {
        dispatch({
            payload: {
                isModalOpen: !isModalOpen
            }
        });
        if (!isModalOpen) {
            dispatch({
                payload: {
                    activeDate: `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)}${parseInt(e?.target?.children[0]?.textContent)}`
                }
            })
        } else {
            dispatch({
                payload: {
                    activeDate: null
                }
            })
        }
    };

    return (
        <>
            {currentDate &&
                <div className="container mx-auto pt-8">
                    <div className="mb-4 flex justify-between align-center gap-4">
                        <div>
                            <Button title="Previous month" onClick={handlePrevMonth}>
                                {'\<'}
                            </Button>
                            <Button title="Next month" onClick={handleNextMonth}>
                                {'\>'}
                            </Button>
                            <Button title="Today" onClick={handleToday}>
                                <span>Today</span>
                            </Button>
                        </div>
                        <span className="text-center text-lg md:text-4xl uppercase font-bold leading-normal">
                            {format(currentDate, "MMMM - yyyy")}
                        </span>
                    </div>
                    <div className="grid grid-cols-7">
                        {WEEKDAYS.map((day) => {
                            return <div key={day}
                                        className="font-bold text-center px-2 py-6 border-[1px] border-gray-500">
                                <span>{day}</span></div>
                        })}
                        {Array.from({length: (firstDayIndex - 1)})?.map((_, index) => {
                            return <div key={`empty-start-${index}`}
                                        className="px-2 py-10 border-[1px] border-gray-500"></div>
                        })}
                        {daysInMonth?.map((day, index) => {
                            return <div key={index}
                                        onClick={handleOpenModal}
                                        className={`font-medium relative px-2 py-10 cursor-pointer transition border-[1px] border-gray-500 hover:border-white hover:shadow-neon ${isToday(day) ? 'shadow-neon border-white' : ''}`}
                            >
                                <span className="absolute bottom-2 right-2">{format(day, "d")}</span>
                            </div>
                        })}
                        {Array.from({length: lastDayIndex ? (7 - lastDayIndex) : 0}).map((_, index) => {
                            return <div key={`empty-end-${index}`}
                                        className="px-2 py-10 border-[1px] border-gray-500"></div>
                        })}
                    </div>
                </div>
            }
            <CalendarModal handleOpenModal={handleOpenModal}/>
        </>
    )
}

export default Calendar;