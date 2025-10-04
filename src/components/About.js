import aboutimg from '../assets/about.png';
export default function About(){
    const config={
        line1:'Hi, am Karthiga. I am a final year proactive student.  My proficiency in Java with a strong academic foundation, positions me as a dynamic candidate.',
        line2:'Strong expertise in web development and cloud technologies.',
        line3:'Seeking to leverage technical skills in Application Development and Technical Support roles to deliver innovative solutions that meet business requirements and contribute to organizational growth through commitment to quality and professional excellence.'
    }
    return <section className='flex flex-col md:flex-row bg-sec px-5' id='about'>
        <div className='py-5 md:w-1/2'>
           <img src={aboutimg}/> 
        </div>
        <div className='md:w-1/2 flex justify-center'>
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl text-white border-b-4 border-[#9c71b5] mb-5 w-[170px] font-bold'>About Me</h1>
            <p className='text-white pb-5'>{config.line1}</p>
            <p className='text-white pb-5'>{config.line2}</p>
            <p className='text-white pb-5'>{config.line3}</p>
        </div>
        </div>
    </section>
}