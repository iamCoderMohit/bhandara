import Navbar from "./Navbar"

function FeedLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-950">
        <Navbar />
        {children}
    </div>
  )
}

export default FeedLayout