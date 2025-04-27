import * as React from "react"
import { Link, HeadFC } from "gatsby"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          404
        </h1>
        <h2 className="text-3xl font-varela-round font-semibold mb-6">
          Page Not Found
        </h2>
        <p className="text-xl font-varela-round mb-8">
          bodyweighttracker.com only has one page. <Link to="/" className="hover:underline text-link">Click here to return to it.</Link>
        </p>
      </div>
    </div>
  )
}

export const Head: HeadFC = () => <title>Not found</title>
