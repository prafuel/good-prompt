import React from 'react'
import Nav from './mini/Nav'
import PromptBox from './Home/PromptBox'


const MainSection = (props) => {
    return (
        <main className="h-screen flex flex-col">
            {/* <Nav /> */}
            <PromptBox data={props.data}/>
        </main>
    )
}

export default MainSection