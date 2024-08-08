import { getLinks } from "@/states/resources"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Resource } from "@/types"
import { QrCode, SearchCheck } from "lucide-react"
import QRCode from "react-qr-code"

import { Link } from "react-router-dom"

const Dashboard = () => {
  const { data, isError } = getLinks()

  if (!data) {
    return <></>
  }

  if (isError) {
    return <>Error fecthing the data...</>
  }

  return (
    <div className="max-w-6xl m-auto ">
      <div className=" flex justify-end items-center mb-4">
        {/* <CreateLink /> */}
        <Link to="/new">Create New</Link>
      </div>

      <div className=" justify-between flex gap-12 flex-wrap">
        {data.result?.map((link: Resource, index: number) => {
          return <LinkCards link={link} index={index} />
        })}
      </div>
    </div>
  )
}

const LinkCards = ({ link, index }: { link: Resource; index: number }) => {
  return (
    <Card className="w-[340px] shadow-sm hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-md">Link #{index}</CardTitle>
          <QRDialog value={"http://localhost:3000"} />
        </div>
        <CardDescription className="flex flex-col">
          <a
            href={link.originalResource}
            className="cursor-pointer hover:underline text-gray-500 font-semibold"
          >
            {link.originalResource}
          </a>

          <a
            href={`http://localhost:5000/${link.shortResource}`}
            className="cursor-pointer hover:underline text-blue-700 font-semibold"
          >
            {`http://localhost:5000/${link.shortResource}`}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex gap-0.5 items-center">
          <SearchCheck className="w-5 h-5" />
          <p>{link.clicks} Clicks</p>
        </div>

        <div className="flex gap-0.5 items-center">
          <QrCode className="w-5 h-5" />
          <p>{link.clicks} Scans</p>
        </div>
      </CardContent>
    </Card>
  )
}

const QRDialog = ({ value }: { value: string }) => {
  return (
    <Dialog>
      <DialogTrigger>Show QR</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan you URL</DialogTitle>
          <DialogDescription>
            <div>
              <QRCode size={256} value={value} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Dashboard
