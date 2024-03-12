
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
    <nav className='py-3 flex justify-center items-center bg-gray-800'>
      <ul className='flex w-full justify-evenly'>
      {
          items.map((key, index) => {
            return <Link className='p-3' key={Date.now} href={itemsObj[key]}> <FontAwesomeIcon icon={logoList[index]} /> </Link>
          })
        }
      </ul>
    </nav>
  )
}

export default Nav