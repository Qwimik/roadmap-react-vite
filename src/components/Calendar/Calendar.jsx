import {useEffect, useState} from "react";
import {eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, subMonths, addMonths} from "date-fns";
import Modal from 'react-modal';
import ModalView from "../ModalView/ModalView.jsx";
import useAppContext from "../../hooks/useAppContext";
import {fetchPostsApi} from "../../api";
import {fetchPosts} from "../../api/posts/fetchPosts.js";

const customStyles = {
    content: {
        color: '#000',
        backgroundColor: '#DDD',
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        borderRadius: '0.75rem',
        overflow: 'hidden'
    },
    overlay: {
        backgroundColor: '#000000c4',
    }
};

Modal.setAppElement('#root');

function Calendar() {
    const {
        WEEKDAYS,
        activeDate,
        currentDate,
        firstDayIndex,
        lastDayIndex,
        daysInMonth,
        isModalOpen,
        posts,
        dispatch
    } = useAppContext();

    const initCalendar = () => {
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

    useEffect(() => {
        dispatch({
            payload: initCalendar()
        });
    }, [currentDate]);

    return (
        <>
            {currentDate &&
                <div className="container mx-auto pt-8">
                    <div className="mb-4 flex justify-between align-center gap-4">
                        <div className="">
                            <button title="Previous month"
                                    type="button"
                                    className="py-2 md:py-4 px-4 md:px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                                    onClick={handlePrevMonth}
                            >
                                {'\<'}
                            </button>
                            <button title="Next month"
                                    type="button"
                                    className="py-2 md:py-4 px-4 md:px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                                    onClick={handleNextMonth}
                            >
                                {'\>'}
                            </button>
                            <button title="Today"
                                    type="button"
                                    className="py-2 md:py-4 px-4 md:px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                                    onClick={handleToday}
                            >
                                <span>Today</span>
                            </button>
                        </div>
                        <span
                            className="text-center text-lg md:text-4xl uppercase font-bold leading-normal">{format(currentDate, "MMMM - yyyy")}</span>
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
            <Modal
                isOpen={isModalOpen}
                style={customStyles}
                onRequestClose={handleOpenModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="Example Modal"
            >
                <ModalView handleOpenModal={handleOpenModal}/>
            </Modal>
        </>
    )
}

export default Calendar;