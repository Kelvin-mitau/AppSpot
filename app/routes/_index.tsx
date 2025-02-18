import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Navabar from "../components/Navabar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full min-h-screen   flex flex-col items-center">
      <nav>
        <Navabar />
      </nav>

      <div className="w-full flex items-center  my-3">
        <div className="Hero-logo mx-auto "><img src="proskill-logo.png" alt="" className=" max-h-48 " /></div>
      </div>
      <div className="max-w-[700px] text-center">
        <p className="px-4 py-1 my-2 rounded-full bg-slate-200 w-fit mx-auto text-black">Explore production ready SAAS products on sale.</p>
        <h1 className="text-3xl font-bold text-center my-2">Join a dynamic community of SaaS developers and businesses, and elevate your success to new heights.</h1>
        <p className="text-slate-300 text-lg">Simple, intuitive, and accessible to everyone.</p>
        <div className="relative inline-flex items-center justify-center gap-4 group my-4">
          <div
            className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-[var(--purple-blue)] via-[var(--light-blue)] to-[var(--aqua)] rounded-xl blur-[4px] filter group-hover:opacity-100 group-hover:duration-200"
          ></div>
          <a
            role="button"
            className="border border-white group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
            title="Sign Up"
            href="/signup"
          >Get Started with AppSpot<svg
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
      </div>
    </div>
  );
}

