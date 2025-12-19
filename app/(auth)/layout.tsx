import Carousel from './components/Carousel'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-red-500">
      <div className="absolute inset-x-4 inset-y-8 mx-auto flex min-h-96 max-w-5xl min-w-11/12 rounded-lg bg-blue-500 p-4 sm:inset-x-16 sm:inset-y-20 sm:min-w-1/2 md:inset-x-30 md:inset-y-32 lg:inset-x-44 xl:inset-x-64">
        {/* Left Part */} {/* Carousel */}
        <div className="relative hidden w-1/2 overflow-hidden rounded-tl-lg rounded-bl-lg lg:block">
          <Carousel />
        </div>
        {/* Right Part */}
        <div className="w-full rounded-tr-lg rounded-br-lg p-4 lg:w-1/2">
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
