import { memo, useState } from 'react'

export default memo((props: {
    setUser: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const [value, setValue] = useState('')

    return (
        <form className='flex flex-col' onSubmit={(e) => {
            e.preventDefault()

            if (value.length) {
                sessionStorage.setItem('user', value)
                props.setUser(sessionStorage.getItem('user'))
            }

            setValue('')
        }}>
            <input
                className='ring-[.5px] ring-[#a7a7a7] w-60 h-10 px-2 rounded-lg mb-3'
                placeholder='Enter your name'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                className='bg-blue-600 py-2 rounded-lg text-white hover:bg-[#001aac] transition-colors'
                type='submit'
            >Login</button>
        </form>
    )
})