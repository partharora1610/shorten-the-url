import { FC, ReactNode } from "react"

type BaseLayoutProps = {
  children: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <div>{children}</div>
    </div>
  )
}

const NavigationBar = () => {
  return (
    <div className="bg-gray-300 px-4 py-4  text-gray-800 font-bold text-lg mb-12">
      LetsShortenLinks
    </div>
  )
}

export default BaseLayout
