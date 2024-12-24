import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export const Layout = () => {
  return <>
    <Navbar />
    <div className="container mx-auto py-8">
      <Outlet />
    </div>
  </>;
}