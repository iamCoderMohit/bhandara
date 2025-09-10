import { useEffect, useState } from "react"

interface errorProps{
    text: String,
    icon: React.ReactNode,
    status: boolean,
    setToast: React.Dispatch<boolean>
}

function Toast({text, icon, status, setToast}: errorProps) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)

        const timer = setTimeout(() => {
            setToast(false)
        }, 3000);

        return () => clearTimeout(timer)
    }, [])

  return (
    <div className={`flex items-center justify-center gap-3 h-10 w-fit rounded-md p-1 absolute top-10 transition-all duration-300 ${show ? '-translate-y-[-10px]' : '-translate-y-[30px]'} -translate-x-1/2  left-1/2 ${status ? 'bg-green-600' : 'bg-red-400'}`}>
        <div className="text-xl">
            {icon}
        </div>
        <h1>{text}</h1>
    </div>
  )
}

export default Toast