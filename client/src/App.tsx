import { Link } from "react-router-dom"
import "./App.css"
import { Button } from "./components/ui/button"

function App() {
  return (
    <>
      <Link to="/dashboard">
        <Button>Move to Dashbaord</Button>
      </Link>
    </>
  )
}

export default App
