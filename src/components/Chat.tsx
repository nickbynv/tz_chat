import { memo, useEffect, useRef, useState } from 'react'
import { IStorageItem } from '../interfaces/storageItem'
import Message from './Message'

export default memo((props: {
    user: string
}) => {
    const [messageText, setMessageText] = useState('')
    const [data, setData] = useState<IStorageItem[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const storage = localStorage.getItem('data')

        if (storage) {
            setData(JSON.parse(storage))
        } else {
            localStorage.setItem('data', '[]')
        }
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [data])

    window.addEventListener('storage', (e) => {
        if (e.storageArea === localStorage) {
            setData(JSON.parse(e.storageArea.data))
        }
    }, false)

    return (
        <div className='h-[100vh] flex flex-col justify-between p-3 w-[23rem] md:w-[47rem] lg:w-[55rem]'>
            <div ref={containerRef} className='mb-3 p-1 rounded-xl overflow-y-auto'>
                {data.map(el => (
                    <Message
                        key={Math.random()}
                        el={el}
                        user={props.user}
                    />
                ))}
            </div>

            <form className='flex h-10' onSubmit={(e) => {
                e.preventDefault()

                if (messageText.length) {
                    localStorage.setItem('data', JSON.stringify(
                        [...data, {
                            user: props.user,
                            message: messageText
                        }]
                    ))

                    setData(JSON.parse(localStorage.getItem('data') || '[]'))
                }

                setMessageText('')
            }}>
                <textarea
                    className='w-full h-full pt-1.5 px-2.5 ring-[.5px] ring-[#a7a7a7] rounded-tl-lg rounded-bl-lg mb-3 p-1 resize-none'
                    placeholder='Enter your message'
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />

                <button
                    className='bg-blue-600 px-7 text-white ring-[.5px] ring-[#000e5c] rounded-tr-lg rounded-br-lg hover:bg-[#001aac] transition-colors'
                    type='submit'
                >Send</button>
            </form>
        </div>
    )
})