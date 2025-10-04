const resumeimg ='/assets/resume.jpg';
export default function Resume(){
    const config={
        link:'https://pdflink.to/86bf1203/',
        l1:'You can view my resume.'
    }
    return <section id='resume' className='flex flex-col md:flex-row bg-sec px-5'>
        <div className='py-5 md:w-1/2 flex justify-center md:justify-end'>
           <img className='w-[300px]'src={resumeimg}/> 
        </div>
        <div className='md:w-1/2 flex justify-center'>
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl text-white border-b-4 border-[#9c71b5] mb-5 w-[140px] font-bold'>Resume</h1>
            <p className='text-white pb-3'>{config.l1}<br></br><br></br><a className='download-btn' href={config.link}>Download</a> </p>
        </div>
        </div>
    </section>
}
