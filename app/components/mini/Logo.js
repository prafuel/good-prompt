import React from 'react'
import Image from "next/image"
import Link from "next/link"

// responsive done

import logo from "../../../public/Good2.png"

const Logo = (props) => {
    const w = props.data.width;
    // console.log(w);
    return (
        <Image layout='fixed' className={`w-${w}`} src={logo} alt="logo"/>
    )
}

export default Logo