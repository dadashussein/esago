import React from 'react'

const Input = ({ children, classname, textColor, type, placeholder }) => {
    return (
        <input type={type}
            placeholder={placeholder}
            className={`w-[280px] outline-none bg-neytral-500  rounded-[16px] px-[16px] py-[8px] border 
         ${children} ${classname},
          ${textColor}`}>
            {children}
        </input>
    )
}

export default Input