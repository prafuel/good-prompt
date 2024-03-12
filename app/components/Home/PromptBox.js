'use client'

import React, { useEffect, useState, useRef } from 'react'
import ListTag from '../mini/ListTag'

import Filter from '../mini/Filter'
import Nav from '../mini/Nav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faRotateRight, faCopy, faGear, faCoffee, faPlus, faFloppyDisk, faUpload, faHandSparkles, faTimes, faSignOutAlt, faBrain, faGears, faServer, faSoccerBall } from '@fortawesome/free-solid-svg-icons'


import { signOut } from 'next-auth/react'

import { deleteCookie } from 'cookies-next'

/* 
blue = #40A2D8
BLACK
CREAME = #F0EDCF

DARK BLUE = #0B60B0
*/

// now work on chatgpt api
// multiple api


import axios from 'axios';
import DynamicTextArea from '../DynamicTextArea'
import Logo from '../mini/Logo'

const PromptBox = (props) => {

    const random = [
        "Write a dialogue between two characters who discover a hidden portal in their backyard.",
        "Describe a futuristic city where humans coexist with advanced artificial intelligence beings.",
        "Create a short story about a chef who discovers a magical ingredient with unusual properties.",
        "Imagine a world where everyone has a unique superpower, but the protagonist's power is considered useless until a critical moment.",
        "Write a poem inspired by the colors of a sunset, exploring the emotions they evoke.",
        "Develop a conversation between a time traveler from the past and a person from the present, discussing the changes in society.",
        "Describe a day in the life of a sentient robot navigating through human society, trying to fit in.",
        "Craft a suspenseful scene set in an abandoned amusement park at midnight.",
        "Create a monologue for a character reflecting on their journey to self-discovery.",
        "Write a letter from a fictional character to their future self, sharing hopes, fears, and aspirations.",
        "Explore a world where dreams come to life, and characters must navigate through dreamscapes to achieve their goals.",
        "Tell a story from the perspective of an inanimate object, giving it a voice and personality.",
        "Write a scene where characters discover an ancient book with the power to change reality, and they must decide how to use it.",
        "Imagine a society where emotions are bought and sold, and explore the consequences of a character losing their ability to feel.",
        "Craft a story set in a post-apocalyptic world where nature has reclaimed urban landscapes, and survivors must adapt to a new way of life."
    ]

    const technical = [
        'Project', 'Coding', 'Development', 'Technical', 'Innovation', 'Technology', 'Programming', 'Cybersecurity', 'Robotics', 'VirtualReality', 'Blockchain', 'AugmentedReality'
    ]

    const creative = ["Fun", "Social", "Design", "Art", "Productivity", "Health", "Writing", "Travel", "Photography", "Music", "Fasion", "Cooking", "Enviroment",
        "Motivation", "Quotes", "Mindfulness", "Space", "Language", "Philosophy", "Psychology", "Anime", "Movies", "Books"
    ]

    const type = [
        "Content", "Equation", "List", "Code", "Explanation", "Key Points", "Other"
    ]

    const pov = [
        "Developer", "Creative", "Artist", "Data Analyst", "Engineer", "Other"
    ]

    const exp_lvl = [
        "Easy to Understand", "Deep", "Complex but Deep"
    ]

    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');
    // render [input, output]
    const [chat, setChat] = useState([
        {
            "input": "Q : How to use Good Prompt effectively??",
            "output": ": As you see on your right side, there are some options. Just fill in those related to your needs and get the results you've always wanted",
            "key": 1
        }
    ]);

    // for file input
    const [upload, setUpload] = useState(false);
    const [selected_file, setSelect_file] = useState(null);

    // filter values
    const [pov_value, setPov_value] = useState('');
    const [type_value, setType_value] = useState('');
    const [LLM, setLLM] = useState('');
    const [model_creativity, setModel_creativity] = useState('');
    const [exp_lvl_value, setExp_lvl_value] = useState('');
    const [domain, setDomain] = useState('');
    const [projectComplexity, setProjectComplexity] = useState('')

    // fetching data from flask api
    const fetchData = async (API_URL, data) => {
        const current = Object.getOwnPropertyNames(data)[0];

        if (current === "user1" || current === "user2") {
            setPrompt("Loading...")
            try {
                const response = await axios.post(API_URL, data);
                return response.data['output'];
            } catch (error) {
                alert(error);
                throw error;
            }
        }

        try {
            const response = await axios.post(API_URL, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log(response);
            return response.data['output'];
        } catch (error) {
            alert(error);
            throw error;
        }


    }

    const handlePromptBtn = async () => {
        if (prompt.trim().length == 0) {
            return;
        }
        // setOutput(prompt)

        // const o = await fetchData("http://localhost:8000/prompt", { "user2": prompt });
        const o = prompt;

        const newItem = {
            input: `Q : ${prompt}`,
            output: `From server : ${o}`,
            key: (Math.random() * 10) + 2
        };

        setChat(prevChat => [...prevChat, newItem]);
        setPrompt('');
    }

    const handleRefineBtn = async () => {
        if (prompt.trim().length == 0) {
            return;
        }

        let filter = {
            "input": prompt,
            "pov": pov_value,
            "type": type_value,
            "understanding_lvl": exp_lvl_value,
            "llm": LLM,
            "creativity": model_creativity
        }
        setPrompt(await fetchData("http://localhost:8000", { "user1": JSON.stringify(filter) }));
    }

    const handleRandomBtn = () => {
        let r = Math.floor(Math.random() * (random.length - 1));
        setPrompt(random[r]);
    }

    const handleRedBtn = () => {
        setPrompt('');
        setOutput('');
    }

    const handleBlueBtn = (key) => {
        const idx = chat.findIndex(item => item.key === key);
        setPrompt(chat[idx]['output'].split(":")[1].trim())
    }

    const handleGrayBtn = (key) => {
        const idx = chat.findIndex(item => item.key === key);
        navigator.clipboard.writeText(chat[idx].output);
        alert("Copied");
    }

    const handleClearBtn = (key) => {
        const idx = chat.findIndex(item => item.key === key);

        // console.log(chat[idx]['input'])


        if (idx !== -1) {
            if (chat[idx]['input'] == "deleted...") {
                const newArray = [...chat]
                newArray.splice(idx, 1)
                setChat(newArray)
            }
            else {
                const updatedChat = [...chat];
                updatedChat[idx] = {
                    input: "deleted...",
                    output: "deleted...",
                    key: key
                };
                setChat(updatedChat);
            }

        }
    }


    const handleLogout = () => {
        deleteCookie('login')
        signOut('google');
    }

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selected_file) { return; };

        setUpload(false);

        try {
            const form_data = new FormData();
            form_data.append("file", selected_file)

            // console.log(form_data)
            const res = await fetchData("http://localhost:8000/file", form_data);
            alert(res);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        }

        setSelect_file(null);
    }

    return (
        <main className='flex h-screen flex-col md:flex-row items-center'>

            {/* upload section : position:absolute */}
            {
                (upload) ?
                    <div className="fixed h-40 left-1/3 ml-11 bottom-1/3 bg-[#18272c] flex flex-col justify-around items-center border border-white">
                        <div className="text-sm flex gap-4 px-3">
                            for now only csv, pdf files are accepted
                            <span onClick={() => setUpload(false)} className='w-3 h-3 bg-red-500 rounded-full flex justify-center items-center p-3'>
                                <FontAwesomeIcon icon={faXmark} className='bg-[#fb254100]' />
                            </span>
                        </div>
                        <div className='w-full flex justify-center items-center px-5'>
                            <form onSubmit={handleFileUpload}>
                                <input type="file" placeholder="File input" onChange={(e) => {
                                    setSelect_file(e.target.files[0]);
                                }} />
                                <button className='border border-white px-2 py-1 hover:bg-purple-900' type="submit">Upload</button>
                            </form>

                        </div>
                    </div>
                    : null
            }

            {/* Left section */}
            <div className='h-full w-full md:w-1/2 flex flex-col'>
                <Nav />
                <div className='logo h-full w-full flex md:flex-col items-center justify-around md:justify-around bg-[#1b1b1b]'>
                    <div className='w-full'><Logo data={{ width: "full" }} /></div>
                    <div className='flex flex-col items-center md:items-center gap-3'>
                        <img src={props.data['user']['image']} className='h-fit w-fit rounded-full border-2 border-white' />
                        <div className='flex items-center'>
                            <span className='bg-[#1b1b1bd8] p-3 rounded-lg'>Welcome, {props.data['user']['name']}</span>
                            <FontAwesomeIcon onClick={handleLogout} className='p-3 h-5 cursor-pointer' icon={faSignOutAlt} />
                        </div>
                    </div>
                </div>
            </div>


            <div className="h-full md:w-full flex flex-col items-center justify-around pb-6 md:px-2">
                {/* Other sections */}
                <div className="chatting h-full w-full flex flex-col p-5" style={{ maxHeight: "750px", overflowY: "auto" }}>



                    {/* chatting section */}
                    <div className="flex flex-col gap-4 px-2">

                        {Array.isArray(chat) && chat.map((item, index) => (
                            <>

                                <div className="flex flex-col" key={index}>
                                    <div>
                                        {/* User avatar */}
                                        <div className="w-full flex items-center justify-end">
                                            <img className="h-10 w-10" src={props.data.user.image} alt="user" />
                                        </div>

                                        <div className="bg-[#dad7d7] text-black rounded-tl-3xl p-3">{item.input}</div>
                                    </div>
                                    
                                    <div className="bg-[#1b1b1b] text-white p-4 rounded-bl-3xl">{item.output}</div>

                                    <div className="flex justify-end">
                                        <button onClick={() => { handleBlueBtn(item.key) }} className="bg-blue-700 p-3">
                                            <FontAwesomeIcon icon={faRotateRight} />
                                        </button>
                                        <button onClick={() => handleGrayBtn(item.key)} className="bg-[#1b1b1b] p-3">
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                        <button onClick={() => handleClearBtn(item.key)} className="bg-purple-600 p-3">
                                            <FontAwesomeIcon icon={faHandSparkles} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                {/* Input promptbox */}
                <div className="promptbox flex flex-col w-full max-w-[53rem] px-6 mt-4">

                    <div className="w-full flex flex-row gap-1">
                        <button onClick={handleRedBtn} className="bg-[#d03046] py-2 flex-grow">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <button onClick={() => setUpload(!upload)} className="bg-[#2c9de8] py-2 flex-grow">
                            <FontAwesomeIcon icon={faUpload} />
                        </button>
                    </div>

                    <DynamicTextArea value={prompt} onChange={setPrompt} />

                    <div className="w-full flex flex-row gap-1">
                        <button onClick={handlePromptBtn} className="flex-grow p-2 bg-purple-700">Prompt</button>
                        <button onClick={handleRefineBtn} className="flex-grow p-2 bg-blue-700">Refine</button>
                        <button onClick={handleRandomBtn} className="flex-grow p-2 bg-[#150050] text-white">Random</button>
                    </div>
                </div>
            </div>


            <div className="h-full w-full md:w-fit bg-[#1b1b1b] flex flex-row justify-between">
                <div className="filter h-full md:min-w-[30rem] sm:min-w-[40rem] flex flex-row-reverse md:px-2">
                    {/* Filter section */}
                    <div className="h-full w-full flex flex-col gap-4 p-3">
                        <Filter data={{ "q": "Select type of work??", "arr": pov, "func": setPov_value, "value": pov_value }} />
                        <Filter data={{ "q": `Select your preferred domain`, "arr": [`Technology`, `Finance`, `Healthcare`, `Education`, `Entertainment`], "func": setDomain, "value": domain }} />
                        <Filter data={{ "q": `Choose the project complexity`, "arr": [`Simple`, `Moderate`, `Complex`, `Advanced`], "func": setProjectComplexity, "value": projectComplexity }} />
                        <Filter data={{ "q": "Type of output", "arr": type, "func": setType_value, "value": type_value }} />
                        <Filter data={{ "q": "Understanding level", "arr": exp_lvl, "func": setExp_lvl_value, "value": exp_lvl_value }} />
                        <Filter data={{ "q": "Choose LLM", "arr": ['mistral-7b', 'llama-2', 'openai', 'text2text', 'claude', 'gemini'], "func": setLLM, "value": LLM }} />
                        <Filter data={{ "q": "Model creativity", "arr": ['Low', 'Medium', 'High', 'Critical'], "func": setModel_creativity, "value": model_creativity }} />
                    </div>
                </div>

                <div className='flex flex-col w-10 bg-gray-800'>
                    <button className='h-full p-2'>
                        <FontAwesomeIcon icon={faGear} className='bg-[#fb254100]' />
                    </button>

                    <button className='h-full'>
                        <FontAwesomeIcon icon={faPlus} className='bg-[#fb254100]' />
                    </button>

                    <button className='h-full'>
                        <FontAwesomeIcon icon={faFloppyDisk} className='bg-[#fb254100]' />
                    </button>
                </div>
            </div>

        </main>

    )
}
export default PromptBox