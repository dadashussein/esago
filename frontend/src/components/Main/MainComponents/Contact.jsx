import React from 'react'
import Input from '~/components/Input'

const Contact = () => {
    return (
        <div className='border'>
            <h1 className='text-[60px]'>Contact information</h1>
            <p>This information will be placed on the top of your resume</p>
            <form className='mt-4 grid grid-cols-1 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                    <label className='text-[12px]' htmlFor="">First name</label>
                    <Input type='text' placeholder='First Name' />
                </div>
                <div className='sm:col-span-3'>
                    <label className='text-[12px]' htmlFor="">Last name</label>
                    <Input type='text' placeholder='Last Name' />
                </div>
            </form>
        </div>
    )
}

export default Contact