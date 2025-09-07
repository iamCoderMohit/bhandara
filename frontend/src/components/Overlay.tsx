function Overlay({children}: {children: React.ReactNode}) {
  return (
    <div className="w-[100vw] h-[100vh] backdrop-blur-2xl absolute inset-0 z-[1]">
        {children}
    </div>
  )
}

export default Overlay