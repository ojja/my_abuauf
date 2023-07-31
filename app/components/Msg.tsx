import { RiAddCircleFill } from "react-icons/ri"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Msg({ message, color }: any) {
    return (
        <div
            className={classNames(
                color === 'yellow' ? 'text-yellow-800 bg-yellow-100' : '',
                color === 'green' ? 'text-green-200 bg-green-300' : '',
                color === 'gray' ? 'text-gray-800 bg-gray-100' : '',
                color === 'red' ? 'text-red-800 bg-red-100' : '',
                'flex py-6 px-6 text-base mb-4 rounded-2xl gap-3'
            )}
            role="alert">
            <RiAddCircleFill />
            <div dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    )
}
