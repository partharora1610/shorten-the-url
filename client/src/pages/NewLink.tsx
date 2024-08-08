import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"
import { createLink } from "@/states/resources"

const NewLink = () => {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get("mode")

  return <div>{mode == "edit" ? <EditLinkForm /> : <NewLinkForm />}</div>
}

const NewLinkForm = () => {
  const [input, setInput] = useState("")
  const create = createLink()

  const submitHandler = () => {
    create.mutate(input)
  }

  return (
    <div className="max-w-xl m-auto border px-4 py-6 rounded-md">
      <h1 className="mb-4 text-xl font-semibold">Create New Link</h1>
      <Label className="text-lg mb-1">Enter the url you want to shorten</Label>
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="mt-12">
        <Button className="w-full" onClick={submitHandler}>
          Create Link
        </Button>
      </div>
    </div>
  )
}

const EditLinkForm = () => {
  const [input, setInput] = useState("")

  const submitHandler = () => {
    console.log(input)
  }

  return (
    <div className="max-w-xl m-auto border px-4 py-6 rounded-md">
      <h1 className="mb-4 text-xl font-semibold">Edit New Link</h1>
      <Label className="text-lg mb-1">Enter the url you want to shorten</Label>
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="mt-12">
        <Button className="w-full" onClick={submitHandler}>
          Create Link
        </Button>
      </div>
    </div>
  )
}

export default NewLink
