import { memo } from 'react'
import { IStorageItem } from '../interfaces/storageItem'

export default memo((props: {
    el: IStorageItem
    user: string
}) => {
    return (
        <div className={`flex items-center
            ${props.user === props.el.user ? 'justify-end' : 'justify-start'}
        mb-2`}>
            <div className={`max-w-full rounded-md px-2
                ${props.user === props.el.user ? 'bg-[#e4fff3]' : 'bg-white'}
            ring-[.5px] ring-slate-300`}>
                <div className="font-medium text-blue-900">{props.el.user}</div>
                <div className="break-words">{props.el.message}</div>
            </div>
        </div>
    )
})