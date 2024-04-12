import {useContext, useEffect, useState} from "react";
import {eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, subMonths, addMonths} from "date-fns";
import AppDataContext from "../../context/App/AppDataContext.jsx";
import Modal from 'react-modal';
import ModalView from "../ModalView/ModalView.jsx";

const customStyles = {
    content: {
        color: '#000',
        backgroundColor: '#DDD',
        top: '40%',
        left: '40%',
        right: '40%',
        bottom: '30%'
    },
    overlay: {
        backgroundColor: '#000000c4',
    }
};

Modal.setAppElement('#root');

function Calendar() {
    const {state, dispatch} = useContext(AppDataContext);
    const {WEEKDAYS, activeDate, currentDate, firstDayIndex, lastDayIndex, daysInMonth, isModalOpen} = state;

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
                currentDate: addMonths(state.currentDate, 1),
            }
        });
    };

    const handlePrevMonth = () => {
        dispatch({
            payload: {
                currentDate: subMonths(state.currentDate, 1),
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
            const dayNumber = e.target.children[0].textContent;
            dispatch({
                payload: {
                    activeDate: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${parseInt(dayNumber)}`
                }
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (activeDate) {
                try {
                    const getDataRes = await fetch('http://localhost:3000/posts');
                    if (getDataRes.status === 200 ) {
                        const getData = await getDataRes.json();
                        const isNewDate = getData.find(day => day.id === activeDate);

                        if (!isNewDate) {
                            await fetch(`http://localhost:3000/posts`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    'id': activeDate
                                })
                            });
                        }
                    }
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            }
        };
        fetchData();
    }, [activeDate]);

    useEffect(() => {
        dispatch({
            payload: initCalendar()
        });
    }, [currentDate]);

    return (
        <>
        {state &&
            <div className="container mx-auto pt-8">
                <div className="mb-4 flex justify-between align-center gap-4">
                    <div className="">
                        <button title="Previous month"
                                type="button"
                                className="py-4 px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                                onClick={handlePrevMonth}
                        >
                            {'\<'}
                        </button>
                        <button title="Next month"
                                type="button"
                                className="py-4 px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                                onClick={handleNextMonth}
                        >
                            {'\>'}
                        </button>
                        <button title="Today"
                                type="button"
                                className="py-4 px-8 hover:bg-sky-600 text-indiigo-100 rounded hover:text-gray-900 transition"
                                onClick={handleToday}
                        >
                            <span>Today</span>
                        </button>
                    </div>
                    <span
                        className="text-center text-4xl uppercase font-bold leading-normal">{format(state.currentDate, "MMMM - yyyy")}</span>
                </div>
                <div className="grid grid-cols-7">
                    {WEEKDAYS.map((day) => {
                        return <div key={day} className="font-bold text-center px-2 py-6 border-[1px] border-gray-500">
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
                        return <div key={`empty-end-${index}`} className="px-2 py-10 border-[1px] border-gray-500"></div>
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