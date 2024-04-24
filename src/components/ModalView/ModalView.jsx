// import {useEffect, useState} from "react";
// import {nanoid} from 'nanoid'
//
// import useAppContext from "../../hooks/useAppContext";
// import {editPostApi, fetchPostsListApi} from "../../api/";
//
// const ModalView = ({handleOpenModal}) => {
//     const [data, setData] = useState({});
//     const [newPostText, setNewPostText] = useState('');
//     const [editTaskText, setEditTaskText] = useState('');
//     const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
//     const [shouldCallApi, setShouldCallApi] = useState(false);
//
//     const {activeDate} = useAppContext();
//
//     useEffect(() => {
//         fetchPostsListApi({id: activeDate, tasks: []}).then(res => {
//             setData({...data, ...res});
//         });
//     }, []);
//
//     useEffect(() => {
//         if (shouldCallApi) {
//             editPostApi(data);
//             setShouldCallApi(false);
//             setSelectedTaskIndex(null);
//         }
//     }, [data, shouldCallApi]);
//
//     const handleAddPost = async (e) => {
//         e.preventDefault();
//         if (newPostText) {
//             const id = nanoid();
//             setData(prevState => ({
//                 ...prevState, tasks: [...(prevState.tasks || []), {[id]: newPostText}]
//             }))
//             setShouldCallApi(true);
//             setNewPostText('');
//         }
//     }
//
//     const handleUpdatePost = (e, id) => {
//         e.preventDefault();
//         if (editTaskText) {
//             setData(pS => ({
//                 ...pS,
//                 tasks: pS.tasks.map(task => {
//                     if (Object.keys(task)[0] === id) {
//                         return {[id]: editTaskText};
//                     } else {
//                         return task;
//                     }
//                 })
//             }));
//             setShouldCallApi(true);
//             setNewPostText('');
//         }
//     }
//
//     const handleDeletePost = (id) => {
//         const filteredData = data.tasks.filter(task => Object.keys(task)[0] !== id);
//         setData(prevState => ({
//             ...prevState, tasks: filteredData
//         }));
//         setShouldCallApi(true);
//     }
//
//     const handleTaskClick = (e, index) => {
//         const task = data?.tasks.filter(task => Object.keys(task)[0] === index) ?? [];
//
//         if (e.target.id === 'taskLiEl' || e.target.id === 'taskSpanEl') {
//             if (task.length > 0) {
//                 setEditTaskText(task[0][index]);
//                 setSelectedTaskIndex(index);
//             }
//         }
//     };
//
//     return (<>
//         <button type="button" onClick={handleOpenModal}
//                 className="absolute top-2 right-2 p-2 border border-[#dddddd]">X
//         </button>
//         <div className="flex flex-col h-full">
//             <h3 className="text-2xl font-bold text-center mb-0">TODO</h3>
//             <div className="w-full h-px bg-gray-500 my-3"></div>
//             <div className="h-full overflow-x-hidden overflow-y-auto">
//                 <ol>
//                     {data?.tasks && data.tasks.map((task, index) => (
//                         <li className="text-wrap break-words mb-2 last:mb-0 pb-2 last:pb-0 border-b border-gray-500 last:border-b-0 relative"
//                             key={index}
//                             id='taskLiEl'
//                             onClick={(e) => handleTaskClick(e, Object.keys(task)[0])}
//                         >
//                             <span id="taskSpanEl">{Object.values(task)[0]}</span>
//                             {selectedTaskIndex === null || selectedTaskIndex === Object.keys(task)[0] && (
//                                 <div key={Object.keys(task)[0]}
//                                      className="absolute -top-[9px] left-0 w-full z-30"
//                                 >
//                                     <form onSubmit={(e) => {
//                                         handleUpdatePost(e, Object.keys(task)[0])
//                                     }}
//                                           className="grid grid-cols-[80%_auto] gap-2 items-center content-center mt-auto">
//                                         <input
//                                             type="text"
//                                             id="editInput"
//                                             className='rounded-xl py-2 px-4'
//                                             autoComplete="off"
//                                             value={editTaskText}
//                                             onChange={(e) => setEditTaskText(e.target.value)}
//                                         />
//                                         <div className="flex flex-wrap">
//                                             <button
//                                                 type="submit"
//                                                 id="editBtn"
//                                                 className="flex flex-1 w-1/2 items-center justify-center border border-gray-100 py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-500 hover:text-white transition w-full max-w-[150px]"
//                                             >
//                                                 Save
//                                             </button>
//                                             <button type="button"
//                                                     className="flex flex-1 w-1/2 items-center justify-center border border-red-100 py-2 px-4 rounded-xl bg-red-100 hover:bg-gray-500 hover:text-white transition w-full max-w-[150px]"
//                                                     onClick={() => {
//                                                         setSelectedTaskIndex(null);
//                                                     }}
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             )}
//                             <div className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
//                                  onClick={() => handleDeletePost(Object.keys(task)[0])}>X
//                             </div>
//                         </li>))}
//                 </ol>
//             </div>
//             <form onSubmit={handleAddPost}
//                   className="grid grid-cols-[1fr_auto] gap-2 items-center content-center mt-auto">
//                 <input
//                     type="text"
//                     id="task"
//                     className='rounded-xl py-2 px-4'
//                     autoComplete="off"
//                     value={newPostText}
//                     onChange={(e) => setNewPostText(e.target.value)}
//                 />
//                 <button
//                     type="submit"
//                     className="block border border-gray-500 py-2 px-4 rounded-xl hover:bg-gray-500 hover:text-white transition w-full max-w-[150px]"
//                 >
//                     Save
//                 </button>
//             </form>
//         </div>
//     </>)
// }
//
// export default ModalView;


import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';

import useAppContext from "../../hooks/useAppContext";
import { editPostApi, fetchPostsListApi } from "../../api/";

const ModalView = ({ handleOpenModal }) => {
    const { activeDate } = useAppContext();

    const [postData, setPostData] = useState({ tasks: [] });
    const [newPostText, setNewPostText] = useState('');
    const [editTaskText, setEditTaskText] = useState('');
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [shouldCallApi, setShouldCallApi] = useState(false);

    useEffect(() => {
        fetchPostsListApi({ id: activeDate, tasks: [] }).then((res) => {
            setPostData({ ...postData, ...res });
        });
    }, [activeDate]);

    useEffect(() => {
        if (shouldCallApi) {
            editPostApi(postData);
            setShouldCallApi(false);
            setSelectedTaskIndex(null);
        }
    }, [postData, shouldCallApi]);

    const handleAddPost = async (e) => {
        e.preventDefault();
        if (newPostText) {
            const id = nanoid();
            const newTask = { [id]: newPostText };
            setPostData((prevState) => ({
                ...prevState,
                tasks: [...prevState.tasks, newTask],
            }));
            setNewPostText('');
            setShouldCallApi(true);
        }
    };

    const handleUpdatePost = (e, id) => {
        e.preventDefault();
        if (editTaskText) {
            setPostData((prevState) => ({
                ...prevState,
                tasks: prevState.tasks.map((task) =>
                    task[id] ? { [id]: editTaskText } : task
                ),
            }));
            setShouldCallApi(true);
            setEditTaskText('');
        }
    };

    const handleDeletePost = (id) => {
        const updatedTasks = postData.tasks.filter(
            (task) => Object.keys(task)[0] !== id
        );
        setPostData({ ...postData, tasks: updatedTasks });
        setShouldCallApi(true);
    };

    const handleTaskClick = (e, index) => {
        const task = postData.tasks.find((task) => Object.keys(task)[0] === index);

        if (e.target.id === 'taskLiEl' || e.target.id === 'taskSpanEl') {
            if (task) {
                setEditTaskText(task[index]);
                setSelectedTaskIndex(index);
            }
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleOpenModal}
                className="absolute top-2 right-2 p-2 border border-[#dddddd]"
            >
                X
            </button>
            <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-center mb-0">TODO</h3>
                <div className="w-full h-px bg-gray-500 my-3"></div>
                <div className="h-full overflow-x-hidden overflow-y-auto">
                    <ol>
                        {postData.tasks.map((task, index) => (
                            <li
                                className="text-wrap break-words mb-2 last:mb-0 pb-2 last:pb-0 border-b border-gray-500 last:border-b-0 relative"
                                key={index}
                                id='taskLiEl'
                                onClick={(e) => handleTaskClick(e, Object.keys(task)[0])}
                            >
                                <span id="taskSpanEl" className="w-full pr-8 break-words">{Object.values(task)[0]}</span>
                                {selectedTaskIndex === null || selectedTaskIndex === Object.keys(task)[0] && (
                                    <div
                                        key={Object.keys(task)[0]}
                                        className="absolute -top-[9px] left-0 w-full z-30"
                                    >
                                        <form
                                            onSubmit={(e) => handleUpdatePost(e, Object.keys(task)[0])}
                                            className="grid grid-cols-1 lg:grid-cols-[80%_auto] gap-2 items-center content-center mt-auto"
                                        >
                                            <input
                                                type="text"
                                                id="editInput"
                                                className='rounded-xl py-2 px-4'
                                                autoComplete="off"
                                                value={editTaskText}
                                                onChange={(e) => setEditTaskText(e.target.value)}
                                            />
                                            <div className="flex flex-wrap items-center justify-center gap-2">
                                                <button
                                                    type="submit"
                                                    id="editBtn"
                                                    className="flex flex-1 w-1/2 items-center justify-center border border-gray-100 py-2 px-4 rounded-xl bg-green-100 hover:bg-gray-500 hover:text-white transition w-full max-w-[150px]"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex flex-1 w-1/2 items-center justify-center border border-red-100 py-2 px-4 rounded-xl bg-red-100 hover:bg-gray-500 hover:text-white transition w-full max-w-[150px]"
                                                    onClick={() => {
                                                        setSelectedTaskIndex(null);
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                <div
                                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-3"
                                    onClick={() => handleDeletePost(Object.keys(task)[0])}
                                >
                                    X
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                <form
                    onSubmit={handleAddPost}
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center content-center mt-auto"
                >
                    <input
                        type="text"
                        id="task"
                        className='rounded-xl py-2 px-4'
                        autoComplete="off"
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="block border border-gray-500 py-2 px-4 rounded-xl hover:bg-gray-500 hover:text-white transition w-full md:max-w-[150px]"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default ModalView;
