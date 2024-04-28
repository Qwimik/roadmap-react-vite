import {useEffect, useState} from "react";
import {nanoid} from 'nanoid';
import useAppContext from "../../hooks/useAppContext";
import {editPostApi, fetchPostsApi, fetchPostsListApi} from "../../api";
import Button from "../Common/Button";

const ModalView = ({handleOpenModal}) => {
    const {activeDate, postsDataApp, dispatch} = useAppContext();

    const [postData, setPostData] = useState({});
    const [newPostText, setNewPostText] = useState('');
    const [editTaskText, setEditTaskText] = useState('');
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [shouldCallApi, setShouldCallApi] = useState(false);

    useEffect(() => {
        if(activeDate) {
            fetchPostsApi().then((res) => {
                const dayData = res.find((post) => post.id === activeDate);

                // const dayData = postsDataApp.find((post) => post.id === activeDate);
                if(dayData?.id !== activeDate) {
                    fetchPostsListApi({id: activeDate, tasks: []}, postsDataApp).then((res) => {
                        console.log(res)
                        setPostData({...res});
                    });
                } else {
                    setPostData({...dayData});
                }
            })
        }
        return () => {
            dispatch({
                payload: {
                    postsDataApp: [...postsDataApp, postData]
                }
            });
        }
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
            const newTask = {[id]: newPostText};
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
                    task[id] ? {[id]: editTaskText} : task
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
        setPostData({...postData, tasks: updatedTasks});
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
            <Button onClick={handleOpenModal} classes="absolute top-2 right-2 p-2 border border-[#dddddd]">
                X
            </Button>
            <div className="flex flex-col h-full gap-4">
                <h3 className="text-2xl font-bold text-center mb-0">TODO</h3>
                {/*<div className="w-full h-px bg-gray-500"></div>*/}
                <div className="h-full overflow-x-hidden overflow-y-auto">
                    <ol>
                        {postData?.tasks?.length === 0 && (
                            <p className="text-center mt-4">No tasks on this day</p>
                        )}
                        {postData?.tasks?.map((task, index) => (
                            <li
                                className="text-wrap break-words border-b border-gray-500 last:border-b-0 relative pr-6 lg:pr-8 py-6"
                                key={index}
                                id='taskLiEl'
                                onClick={(e) => handleTaskClick(e, Object.keys(task)[0])}
                            >
                                <span id="taskSpanEl" className="pr-8 break-words block w-full">
                                    {Object.values(task)[0]}
                                </span>
                                {selectedTaskIndex === null || selectedTaskIndex === Object.keys(task)[0] && (
                                    <div
                                        key={Object.keys(task)[0]}
                                        className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full z-30 bg-[#DDDDDD]"
                                    >
                                        <form
                                            onSubmit={(e) => handleUpdatePost(e, Object.keys(task)[0])}
                                            className="grid grid-cols-1 lg:grid-cols-[80%_auto] gap-2 items-center content-center mt-4"
                                        >
                                            <textarea
                                                id="editInput"
                                                className='rounded-xl py-2 px-4'
                                                autoComplete="off"
                                                value={editTaskText}
                                                onChange={(e) => setEditTaskText(e.target.value)}
                                            >{editTaskText}</textarea>
                                            <div className="flex flex-wrap items-center justify-center gap-2">
                                                <Button
                                                    type="submit"
                                                    id="editBtn"
                                                    classes="flex flex-1 w-1/2 items-center justify-center border border-gray-100 py-2 px-4 rounded-xl bg-green-100 hover:bg-green-500 hover:text-white transition w-full max-w-[150px]"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    classes="flex flex-1 w-1/2 items-center justify-center border border-red-100 py-2 px-4 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white transition w-full max-w-[150px]"
                                                    onClick={() => {
                                                        setSelectedTaskIndex(null);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
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
                    <Button
                        type="submit"
                        classes="block border border-gray-500 py-2 px-4 rounded-xl hover:bg-gray-500 hover:text-white transition w-full md:max-w-[150px]"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </>
    );
};

export default ModalView;
