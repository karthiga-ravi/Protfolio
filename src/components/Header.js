import { Bars3Icon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Header() {
    const [toggleMenu, setToggleMenu]  = useState(false);

    return <header className="flex justify-between item-center px-5 py-4 bg-sec shadow-lg fixed w-full z-50">
        <div className='flex item-center justify-between w-full h-full'>
        <a className="font-bold text-2xl font-hero-font text-white" href="#">R Karthiga</a>
        <nav className="hidden md:block">
            <ul className="flex space-x-8 text-white ">
                <li><a href="/" className="hover:text-gray-300 transition duration-300">Home</a></li>
                <li><a href="#about" className="hover:text-gray-300 transition duration-300">About</a></li>
                <li><a href="#projects" className="hover:text-gray-300 transition duration-300">Projects</a></li>
                <li><a href="#resume" className="hover:text-gray-300 transition duration-300">Resume</a></li>
                <li><a href="#contact" className="hover:text-gray-300 transition duration-300">Contact</a></li>
            </ul>
        </nav>
        {toggleMenu && <nav className="block md:hidden absolute top-16 left-0 right-0 bg-primary shadow-md">
            <ul onClick={() => setToggleMenu(!toggleMenu)} className="flex flex-col text-white  mobile-nav">
                <li><a href="#" className="hover:text-gray-300 transition duration-300">Home</a></li>
                <li><a href="#about" className="hover:text-gray-300 transition duration-300">About</a></li>
                <li><a href="#projects" className="hover:text-gray-300 transition duration-300">Projects</a></li>
                <li><a href="#resume" className="hover:text-gray-300 transition duration-300">Resume</a></li>
                <li><a href="#contact" className="hover:text-gray-300 transition duration-300">Contact</a></li>
            </ul>
        </nav>}
        </div>
        <button onClick={() => setToggleMenu(!toggleMenu)} className='block md:hidden text-white focus:outline-none'><Bars3Icon className='text-white h-5 w-5'/></button>
    </header>
}
