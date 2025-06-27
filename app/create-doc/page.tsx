"use client"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
})

const CreateDocPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex">
        <div className="w-1/2 p-4">
          <Editor />
        </div>
        <div className="w-1/2 p-4">
          {/* Preview or other content can go here */}
          Preview Area
        </div>
      </div>
    </div>
  )
}

export default CreateDocPage
