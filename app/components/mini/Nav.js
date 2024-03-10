
// responsive -> done

import React from 'react'
import Link from 'next/link'

import { faHome, faPeopleArrows, faSoccerBall } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWebflow } from '@fortawesome/free-brands-svg-icons'

const logoList = [
  faHome,
  faPeopleArrows,
  faWebflow,
  faSoccerBall,
]

const Nav = () => {
  const items = ['Home', 'About', 'Community', 'Support']

  const itemsObj = {
    "Home" : "/",
    "About" : "/nav/about",
    "Community" : "/nav/community",
    "Support" : "/nav/support"
  }

  return (
    <nav className='py-2 w-1/2 flex justify-center items-center absolute bg-[#000000] rounded-br-xl'>
      <ul className='flex-1 text-center'>
      {
          items.map((key, index) => {
            return <Link className='px-20 py-3 inline-block' key={Date.now} href={itemsObj[key]}> <FontAwesomeIcon icon={logoList[index]} /> </Link>
          })
        }
      </ul>
    </nav>
  )
}

export default Nav