import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import cover from "./assets/cover.jpg";
import Modal from 'react-modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import db from './server/db';
import db_queries from './server/db/db_queries';

function App() {
    const prevBtn = useRef<HTMLButtonElement>(null);
    const nextBtn = useRef<HTMLButtonElement>(null);
    const book = useRef<HTMLDivElement>(null);

    const paper1 = useRef<HTMLDivElement>(null);
    const paper2 = useRef<HTMLDivElement>(null);
    const paper3 = useRef<HTMLDivElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [list, setList] = useState<string[]>([]);
    const [currentToDoListInput, setCurrentToDoListInput] = useState<string>("");
    const [currentState, setCurrentState] = useState<number>(1);

    useEffect(() => {
        //logic for checking if user is logged in

    }, [])

    // Event listeners
    //   prevBtn.addEventListener("click", goPrevious);
    //   nextBtn.addEventListener("click", goNext);

    // Business Logic
    let numOfPapers = 3;
    let maxState = numOfPapers + 1;

    function login(e: FormEvent) {
        e.preventDefault();
        //action for logging in
        //TODO: call backend and login
        setIsLoggedIn(true);
        closeModal();
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function saveToDoListInput() {
        // let data = {
        //     "content": `${currentToDoListInput}`
        // }
        // fetch('/api/chirps', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        setList([...list, currentToDoListInput]);
        setCurrentToDoListInput("");
    }

    function openBook() {
        book.current!.style.transform = "translateX(50%)";
        prevBtn.current!.style.transform = "translateX(-180px)";
        nextBtn.current!.style.transform = "translateX(180px)";
    }

    function closeBook(isFirstPage: boolean) {
        if (isFirstPage) {
            book.current!.style.transform = "translateX(0%)";
        } else {
            book.current!.style.transform = "translateX(100%)";
        }
        prevBtn.current!.style.transform = "translateX(0px)";
        nextBtn.current!.style.transform = "translateX(0px)";
    }

    function goNext() {
        if (currentState < maxState) {
            switch (currentState) {
                case 1:
                    openBook();
                    paper1.current!.classList.add("flipped");
                    paper1.current!.style.zIndex = "1";
                    break;
                case 2:
                    paper2.current!.classList.add("flipped");
                    paper2.current!.style.zIndex = "2";
                    break;
                case 3:
                    closeBook(false);
                    paper3.current!.classList.add("flipped");
                    paper3.current!.style.zIndex = "3";
                    break;
                default:
                    throw new Error("unkown state");
            }
            //     if (currentState === maxState) {
            //         closeBook(true);
            //   }
            setCurrentState(currentState + 1);
        }
    }

    function goPrevious() {
        if (currentState > 1) {
            switch (currentState) {
                case 2:
                    closeBook(true);
                    paper1.current!.classList.remove("flipped");
                    paper1.current!.style.zIndex = "3";
                    break;
                case 3:
                    paper2.current!.classList.remove("flipped");
                    paper2.current!.style.zIndex = "2";
                    break;
                case 4:
                    openBook();
                    paper3.current!.classList.remove("flipped");
                    paper3.current!.style.zIndex = "1";
                    break;
            }

            setCurrentState(currentState - 1);
        }
    }

    function toDoListItemClicked(index: number) {
        setList(list.filter((_, i) => i != index));
    }

    return (
        <>
            <div className={"d-flex flex-row container-fluid"}>
                <div id={"background"} className={"container-fluid"}>
                    {isLoggedIn && <button
                        id={"prev-btn"}
                        className="col-1 navigation-button"
                        ref={prevBtn}
                        onClick={goPrevious}
                    >
                        <i className={"fas fa-arrow-circle-left"}/>
                    </button>}

                    <div id={"book"} className="book" ref={book}>
                        <div id="p1" ref={paper1} className={"paper"}>
                            <div className={"front"}>
                                <div id="f1" className={"front-content"}>
                                    <h1 className={"book-title"}>Who Task'd It?</h1>
                                    <img className={"cover-img"} src={cover} alt={"dog"}/>
                                    {!isLoggedIn &&
                                        <button onClick={openModal} className={"btn btn-dark btn-lg"}>Login</button>}
                                </div>
                            </div>
                            <div className={"back"}>
                                <div id="b1" className={"back-content"}>
                                    <h2>Create a Todo List:</h2>
                                    <div className={"content"}>
                                        <textarea id={"note"} rows={12} cols={50}
                                                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCurrentToDoListInput(e.target.value)}
                                                  value={currentToDoListInput}/>
                                        <button className={"btn btn-dark"} onClick={saveToDoListInput}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="p2" ref={paper2} className={"paper"}>
                            <div className={"front"}>
                                <div id="f2" className={"front-content"}>
                                    <ul>{list.map((item, index) => <>
                                        <li><FontAwesomeIcon icon={faCheck} style={{cursor: "pointer"}}
                                                             onClick={() => toDoListItemClicked(index)}/> {item}</li>
                                    </>)}</ul>
                                </div>
                            </div>
                            <div className={"back"}>
                                <div id="b2" className={"back-content"}>
                                    <h1>Suspect List</h1>
                                    <ul>
                                        <li>First Suspect</li>
                                        <li>Second Suspect</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="p3" ref={paper3} className={"paper"}>
                            <div className={"front"}>
                                <div id="f3" className={"front-content"}>
                                    <h1>Clues</h1>
                                    <div className={"row"}>
                                        <div className={"col-6"}>
                                            <h2>Weapons</h2>
                                            <ul>
                                                <li onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                                    const element = (e.target as HTMLLIElement);
                                                    element.style.backgroundColor = "yellow";
                                                }} style={{cursor: "pointer"}}>first clue
                                                </li>
                                                <li>second clue</li>
                                            </ul>
                                        </div>
                                        <div className={"col-6"}>
                                            <h2>Locations</h2>
                                            <ul>
                                                <li>first clue</li>
                                                <li>second clue</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button className={"btn btn-lg btn-dark"}>Solve</button>
                                </div>
                            </div>
                            <div className={"back"}>
                                <div id="b3" className={"back-content"}>
                                    <h1>Your solved Mysteries:</h1>
                                    <div className={"content"}>
                                        <textarea id={"note"} rows={12} cols={50}/>
                                    </div>
                                    <input className={"btn btn-dark"} type={"Save"} value={"Save"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoggedIn && <button
                        id={"next-btn"}
                        className="mr-0 col-1 navigation-button"
                        ref={nextBtn}
                        onClick={goNext}
                    >
                        <i className={"fas fa-arrow-circle-right"}/>
                    </button>}
                </div>
                <div className={"sidebar"}>
                    <h1>Instructions</h1>
                    <ul>
                        <li>
                            Instruction 1
                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="Example Modal"
            >
                <form>
                    <label htmlFor={"username"}>Username</label>
                    <input id={"username"} type={"text"}/>
                    <label htmlFor={"password"}>Password</label>
                    <input id={"password"} type={"password"}/>
                    <button className={"btn btn-dark btn-lg"} onClick={login}>Submit</button>
                </form>
            </Modal>
        </>
    );
}

export default App;
