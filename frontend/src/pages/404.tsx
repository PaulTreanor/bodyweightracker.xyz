import * as React from "react"
import { Link, HeadFC } from "gatsby"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">bodyweighttracker.xyz only has one page. <Link to="/" className="text-blue-600 hover:underline">Click here to return to it.</Link></p>

      </div>
    </div>
  )
}

export const Head: HeadFC = () => <title>Not found</title>
