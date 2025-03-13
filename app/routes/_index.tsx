import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import Navabar from "../components/Navbar";
import Layout from "./Layout";


export const meta: MetaFunction = () => {
  return [
    { title: "AppSpot" },
    { name: "description", content: "AppSpot is your go-to platform for buying and selling predeveloped SaaS products. Explore a vast marketplace of software solutions designed to boost your business productivity and innovation. Join today and transform your operations with ready-to-use applications tailored to your needs." }
  ]
};

export default function Index() {

  return (
    <Layout>
      <div className="w-full min-h-screen   flex flex-col items-center">
        <div className="w-full flex items-center  my-3">
          <div className="Hero-logo mx-auto "><img src="proskill-logo.png" alt="" className=" max-h-48 " /></div>
        </div>
        <div className="max-w-[700px] text-center">
          <p className="px-4 py-1 my-2 rounded-full bg-slate-200 w-fit mx-auto text-black">Explore production ready web and mobile products on sale.</p>
          <h1 className="text-3xl font-bold text-center my-2">Join a dynamic community of web and mobile developers and businesses, and elevate your success to new heights.</h1>
          <p className="text-slate-300 text-lg">Simple, intuitive, and accessible to everyone.</p>
          <div className="relative inline-flex items-center justify-center gap-4 group my-4">
            <div
              className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-[var(--purple-blue)] via-[var(--light-blue)] to-[var(--aqua)] rounded-xl blur-[4px] filter group-hover:opacity-100 group-hover:duration-200"
            ></div>
            <a
              role="button"
              className="border border-white group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              href="/explore"
            >Start exporing with AppSpot<svg
              aria-hidden="true"
              viewBox="0 0 10 10"
              height="10"
              width="10"
              fill="none"
              className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
            >
                <path
                  d="M0 5h7"
                  className="transition opacity-0 group-hover:opacity-100"
                ></path>
                <path
                  d="M1 1l4 4-4 4"
                  className="transition group-hover:translate-x-[3px]"
                ></path>
              </svg>
            </a>
          </div>
          <div className="block">
            <Link to={"/guide"} className="bg-indigo-500 rounded-lg px-4 py-1 font-semibold tracking-wide text-lg flex items-center mx-auto gap-1 w-fit">
              <span>Guides and Support</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              >
                <path
                  d="M1 1l4 4-4 4"
                  className="transition hover:translate-x-[3px]"
                ></path>
              </svg></Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

