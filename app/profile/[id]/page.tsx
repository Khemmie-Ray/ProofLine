import React from 'react'

const QuestionStats = () => {
  return (
   <main className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12">
      <section className='my-5 border border-black/20 rounded-lg p-4'>
        <h2 className='text-[18px] font-bold mb-2'>Question</h2>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, enim!</p>
        <div className='flex justify-between items-center  px-2 text-[12px] rounded-lg py-4 my-2'>
                  <div className='w-[48%] text-center border-r border-black/20'>
                <p className='uppercase mb-2'>option a</p>
                <p className='font-bold text-[20px]'>11</p>
                <p>60%</p>
            </div>
               <div className='w-[48%] text-center'>
                <p className='uppercase mb-2'>option b</p>
                <p className='font-bold text-[20px]'>9</p>
                <p>40%</p>
            </div>
        </div>
        <div className='my-4 border-t border-black/20 py-4'>
        <h2 className='font-bold mb-4'>Comments</h2>
        <ul className='px-2'>
            <li className='list-disc text-[12px] mb-3'>Lorem ipsum dolor sit amet consectetur.</li>
            <li className='list-disc text-[12px] mb-3'>Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
        </div>
    </section>
   </main>
  )
}

export default QuestionStats