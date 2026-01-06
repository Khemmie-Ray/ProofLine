import React from 'react'
import { Send } from 'lucide-react';

const Assessor = () => {
  return (
    <main className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12 text-[14px]">
        <section className='border border-black/10 rounded-[21px] px-4 py-8 shadow-md'>
          <h1 className='font-bold text-[20px] mb-4'>Question</h1>
          <p className='mb-3 border-l-6 text-[16px] border-green-600 pl-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos doloribus consectetur eos ut vero eum?</p>
          <div className='flex items-center mb-3'>
            <input type="radio" className='mr-2'/>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
             <div className='flex items-center mb-3'>
            <input type="radio" className='mr-2'/>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='border border-black/20 rounded-[21px] flex flex-col p-4'>
          <textarea name="" id="" placeholder='Enter a comment' className='h-[90px] w-full outline-none' />
          <button className='bg-black rounded-full p-3 ml-auto'><Send className='text-white'/></button>
          </div>

        </section>
    </main>
  )
}

export default Assessor;