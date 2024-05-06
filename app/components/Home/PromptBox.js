'use client'

import React, { useEffect, useState, useRef } from 'react'
import ListTag from '../mini/ListTag'

import Filter from '../mini/Filter'
import Nav from '../mini/Nav'

import Link from 'next/link'

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
import Spinner from '../mini/Spinner'
import InputFilter from '../mini/InputFilter'

const PromptBox = (props) => {

    // =======================================================================================
    // fetching from mongodb -> prebuiltPrompts

    const [random, setRandom] = useState([]);

    const fetchRandom = async () => {
        try {
            // Make a GET request to your URL
            const response = await axios.get('http://127.0.0.1:8000/mongo/collection/randomInput');

            // Handle the response data
            setRandom(response.data['output']);
            console.log(response.data['output']);
        } catch (error) {
            // Handle any errors
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchRandom();
    }, []);


    // =======================================================================================


    // =======================================================================================
    // fetching from mongodb -> prebuiltPrompts
    const [prebuit, setPrebuilt] = useState(null);
    const fetchPrebuilt = async () => {
        try {
            // Make a GET request to your URL
            const response = await axios.get('http://127.0.0.1:8000/mongo/collection/prebuiltPrompts');

            // Handle the response data
            setPrebuilt(response.data['output']);
            // console.log(response.data);
        } catch (error) {
            // Handle any errors
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPrebuilt();
    }, []);
    // ===================================================================================


    const type = [
        "--- Select ---", "Content", "List", "Code", "Explanation", "Key Point", "Roadmap", "Letter Writing"
    ]


    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');

    // for filter options -> prebuit or Custom
    const [currentFilter, setCurrentFilter] = useState({ 0: 'Prebuilt Powerful Prompts' });
    const cf = ['Prebuilt Powerful Prompts', 'Create Custom Prompt', 'Merge Prompts To Make Master Prompt']


    // merge prompt
    const [merge, setMerge] = useState(
        {
            'count': 2,
            'prompt1': '',
            'prompt2': '',
        }
    )
    // merge result
    const [result, setResult] = useState('');


    // render [input, output]
    const [chat, setChat] = useState([
        {
            "input": "Q : How to use Good Prompt effectively??",
            "output": "As you see on your right side, there are some options. Just fill in those related to your needs and get the results you've always wanted",
            "key": 1
        }
    ]);

    // for file input
    const [upload, setUpload] = useState(false);
    const [selected_file, setSelect_file] = useState(null);

    // filter values
    const [filter, setFilter] = useState({
        "user": null,
        "input": null,
        "type": null,
        "format": null,
        "tags": null,
    });

    // fetching data from flask api
    const fetchData = async (API_URL, data) => {
        const current = Object.getOwnPropertyNames(data)[0];

        if (current === "user1" || current === "user2") {
            setPrompt("Loading...")
            try {
                const response = await axios.post(API_URL, data);
                return response.data['output'];
            } catch (error) {
                // alert(error);
                return undefined;
            }
        }

        else {
            try {
                const response = await axios.post(API_URL, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // console.log(response);
                return response.data['output'];
            } catch (error) {
                return undefined;
                // alert(error);
            }
        }
    }

    const handleGenerateBtn = async () => {
        if (prompt.trim().length == 0) {
            return;
        }
        // setOutput(prompt)

        let res = JSON.stringify(filter);
        // const o = prompt;

        const newItem = {
            input: `Q : ${filter['input']}`,
            output: `${res}`,
            key: (Math.random() * 10) + 2
        };

        setChat(prevChat => [...prevChat, newItem]);
        setPrompt('');
    }

    const handlePromptBtn = async () => {
        if (prompt.trim().length == 0) {
            return;
        }
        // setOutput(prompt)

        let res = await fetchData("http://localhost:8000/prompt", { "user2": JSON.stringify(filter) });
        if (res === undefined) { res = "Server Side Error" }
        // const o = prompt;

        const newItem = {
            input: `Q : ${filter['input']}`,
            output: `${res}`,
            key: (Math.random() * 10) + 2
        };

        setChat(prevChat => [...prevChat, newItem]);
        setPrompt('');
    }

    const handleRefineBtn = async () => {
        if (prompt && prompt.trim().length == 0) {
            return;
        }

        let res2 = await fetchData("http://localhost:8000", { "user1": JSON.stringify(filter) });
        const p = prompt;
        (res2 === undefined) ? setPrompt(p) : setPrompt(res2);
    }

    const handleRandomBtn = () => {
        let r = Math.floor(Math.random() * (random.length - 1));
        let p = random[r]['input'];

        const prev = { ...filter };
        prev['input'] = p;
        setFilter(prev);

        setPrompt(p);
    }

    const handleRedBtn = () => {
        setPrompt('');
        setOutput('');
    }

    const handleBlueBtn = (key) => {
        const idx = chat.findIndex(item => item.key === key);
        setPrompt(chat[idx].output);
    }

    const handleGrayBtn = (key) => {
        const idx = chat.findIndex(item => item.key === key);
        navigator.clipboard.writeText(chat[idx]['output']);
        alert("Copied");
    }

    const handleClearBtn = (key) => {
        const idx = chat.findIndex(item => item.key === key);

        // console.log(chat[idx]['input'])


        if (idx !== -1) {
            const newArray = [...chat]
            newArray.splice(idx, 1)
            setChat(newArray)
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

    // merge submit
    const handleSubmit = async () => {
        const str = JSON.stringify(merge);

        if (!merge['prompt1'].trim().length || !merge['prompt2'].trim().length) { return };
        // res = merge['prompt1'] + merge['prompt2'];
        const res = await fetchData("http://localhost:8000/transfer", {"user1" : JSON.stringify({"from_prompt" : merge['prompt1'], "too_prompt" : merge['prompt2']})});

        console.log(res);
        setResult(res);

        setPrompt('');

        const prev = { ...filter };
        prev['input'] = res;
        setFilter(prev);
    }

    console.log(chat);

    return (
        <main className='flex h-screen xl:flex-row flex-col items-center'>

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
            <div className='h-full w-full xl:w-[70rem] flex flex-col'>
                <Nav />
                <div className='logo h-full flex flex-row xl:flex-col items-center justify-around md:justify-around bg-[#1b1b1b]'>
                    <div className='w-90'><Logo data={{ width: "w-fit" }} /></div>
                    <div className='flex w-full xl:flex-col flex-row items-center justify-center gap-3'>
                        <img src={props.data['user']['image']} className='h-fit w-fit rounded-full border-2 border-white' />
                        <div className='flex items-center'>
                            <span className='bg-[#1b1b1bd8] p-3 rounded-lg'>Welcome, {props.data['user']['name']}</span>
                            <FontAwesomeIcon onClick={handleLogout} className='p-3 h-5 cursor-pointer' icon={faSignOutAlt} />
                        </div>
                    </div>
                </div>
            </div>


            {/* Middle Section */}
            <div className="h-full md:w-full flex flex-col items-center justify-around pb-6 md:px-2">
                {prompt === "Loading..." ? <div className="w-full my-10 flex justify-center items-center absolute top-1/4"> <Spinner /> </div> : ""}
                {/* Other sections */}
                <div className="chatting h-full sm:w-full flex flex-col p-5 overflow-y-scroll" style={{ maxHeight: "750px"}}>

                    {/* chatting section */}
                    <div className="flex flex-col gap-4 px-2 items-center">

                        {Array.isArray(chat) && chat.map((item, index) => (
                            <>

                                <div className="flex flex-col max-w-2xl" key={index}>
                                    <div>
                                        {/* User avatar */}
                                        <div className="w-full flex items-center justify-end">
                                            <img className="h-10 w-10" src={props.data.user.image} alt="user" />
                                        </div>

                                        <div className="bg-[#dad7d7] text-black rounded-tl-3xl p-3 overflow-x-scroll">
                                            {item.input}
                                        </div>
                                    </div>

                                    <div className="bg-[#1b1b1b] text-white p-4 overflow-x-scroll">
                                        {item.output}
                                    </div>

                                    <div className="flex justify-evenly w-2/3">
                                        <button onClick={() => { handleBlueBtn(item.key) }} className="bg-blue-700 p-3 w-full">
                                            <FontAwesomeIcon icon={faRotateRight} />
                                        </button>
                                        <button onClick={() => handleGrayBtn(item.key)} className="bg-[#150050] p-3 w-full">
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                        <button onClick={() => handleClearBtn(item.key)} className="bg-red-500 p-3 w-full">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                {/* Input promptbox */}
                <div className="promptbox flex flex-col w-full px-6 mt-4">

                    <div className="w-full flex flex-row gap-1">
                        {/* <button onClick={handleRedBtn} className="bg-[#d03046] py-2 flex-grow">
                            <FontAwesomeIcon icon={faXmark} />
                        </button> */}
                        <button onClick={() => setUpload(!upload)} className="bg-[#2c9de8] py-2 flex-grow">
                            <FontAwesomeIcon icon={faUpload} />
                        </button>
                    </div>

                    <DynamicTextArea filter={filter} setFilter={setFilter} value={prompt} onChange={setPrompt} />

                    <div className="w-full flex flex-row gap-1">
                        <button onClick={handlePromptBtn} className="flex-grow p-2 bg-purple-700">Prompt</button>
                        <button onClick={handleGenerateBtn} className="flex-grow p-2 bg-green-700">Generate</button>
                        <button onClick={handleRefineBtn} className="flex-grow p-2 bg-blue-700">Refine</button>
                        <button onClick={handleRandomBtn} className="flex-grow p-2 bg-[#150050] text-white">Random</button>
                        <button onClick={handleRedBtn} className="flex-grow p-2 bg-red-500 text-white">Clear</button>
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="h-full w-full bg-[#1b1b1b] flex flex-col justify-between">

                <h1 className='w-full py-5 text-center text-md bg-gray-800'>
                    ...
                    <FontAwesomeIcon icon={faCoffee} className='px-3' />
                    For Better Prompting
                    ...
                </h1>

                <div className="filter h-full md:min-w-[40rem] sm:min-w-[40rem] flex flex-row-reverse md:px-2 overflow-y-scroll">
                    {/* Filter section */}
                    <div className="h-full w-full flex flex-col gap-4 p-3">

                        <Filter data={{ "q": "Customization : ", "arr": cf, "func": setCurrentFilter, "object": 0, "filter": currentFilter }} />

                        {
                            // Custom Prompts
                            (currentFilter[0] === "Create Custom Prompt") ? <>
                                {/* user type */}
                                <InputFilter text={"Select user type : "} placeholder={"eg. Frontend Developer, Artist, Teacher"}
                                    value={filter} setValue={setFilter} object={'user'} nrows={1}
                                />
                                <Filter data={{ "q": "Output type : ", "arr": type, "func": setFilter, "object": "type", "filter": filter }} />

                                {/* format options */}
                                <InputFilter text={"Specify format :"} placeholder={'eg. ```{input : [output]}``` '}
                                    value={filter} setValue={setFilter} object={'format'} nrows={4}
                                />

                                {/* tags */}
                                <InputFilter text={"Extra tags :"} placeholder={"eg. frontend, react, api, nextjs"}
                                    value={filter} setValue={setFilter} object={'tags'} nrows={4}
                                />

                            </> :
                                // Prebuilt Prompts
                                (currentFilter[0] == "Prebuilt Powerful Prompts") ?
                                    <>
                                        {   (prebuit == null) ? <div className='flex justify-center items-center h-full'> <Spinner /> </div>:
                                            prebuit.map((item) => {
                                                const user = item['user'];
                                                const prompt = item['prompt'];
                                                const index = item['index'];

                                                return (
                                                    <> <div className='flex flex-col'>
                                                        <InputFilter text={`${index}. ${user}`} value={prompt}
                                                            nrows={10} disable={true} />

                                                        <div className='flex justify-end'>
                                                            <button onClick={() => { setPrompt(prompt || null) }} className="bg-blue-700 p-3 w-1/4">
                                                                <FontAwesomeIcon icon={faRotateRight} />
                                                            </button>

                                                            {/* working on copy button */}
                                                            <button onClick={() => alert(prompt)} className="bg-[#150050] p-3 w-1/4">
                                                                <FontAwesomeIcon icon={faCopy} />
                                                            </button>
                                                        </div>
                                                    </div> </>
                                                )

                                                console.log(prompt);
                                            })
                                        }
                                    </> :

                                    // Merge Prompts
                                    (currentFilter[0] == "Merge Prompts To Make Master Prompt") ? <>
                                        <Filter data={{ "q": "Select Count : ", "arr": [2], "func": setMerge, "object": "count", "filter": merge }} />
                                        {/* prompt1 */}
                                        <InputFilter text={"From :"} placeholder={"Paste Prompt1 here"}
                                            value={merge} setValue={setMerge} object={'prompt1'} nrows={8}
                                        />
                                        {/* prompt2 */}
                                        <InputFilter text={"Into :"} placeholder={"Paste Prompt2 here"}
                                            value={merge} setValue={setMerge} object={'prompt2'} nrows={8}
                                        />

                                        {/* Merge Submit Button */}
                                        <button onClick={handleSubmit} className='w-full p-4 bg-blue-500'>Submit</button>

                                        {/* Resultant Prompt */}
                                        <InputFilter text={"Result : "} placeholder={"Output will be shown here"}
                                            value={result} setValue={setResult} nrows={8} disable={true}
                                        />

                                        {/* for better functionality */}
                                        <div className='w-full flex-col bg-white justify-evenly'>
                                            <button onClick={() => { setPrompt(result || null) }} className="bg-blue-700 p-3 w-1/3">
                                                <FontAwesomeIcon icon={faRotateRight} />
                                            </button>
                                            {/* working on copy button */}
                                            <button onClick={() => alert(result)} className="bg-[#150050] p-3 w-1/3">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>

                                            {/* Clear REsult*/}
                                            <button onClick={() => {
                                                // Clear result
                                                setResult('');

                                                // Clear Input prompts
                                                const prev = { ...merge };
                                                prev['prompt1'] = '';
                                                prev['prompt2'] = '';
                                                setMerge(prev);

                                            }} className="bg-red-500 p-3 w-1/3">
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>

                                        </div>

                                    </> : null
                        }

                    </div>
                </div>

                <div className='flex flex-row bg-gray-800 w-full justify-evenly'>
                    <Link href="/settings" className='h-full p-2'>
                        <FontAwesomeIcon icon={faGear} className='bg-[#fb254100]' />
                    </Link>

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