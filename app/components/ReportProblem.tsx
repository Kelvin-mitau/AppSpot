import { useFetcher } from '@remix-run/react'

interface props {
  error: undefined | string,
  msg: undefined | string
}
const ReportAProblem: React.FC<props> = ({ msg, error }) => {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='POST' preventScrollReset >
      <textarea
        name="issue"
        id=""
        rows={4}
        className="w-full resize-none rounded p-2 bg-blue-100 text-black"
        placeholder="Describe your  problem?"
        required
        maxLength={800}
      ></textarea>

      <div className="flex justify-end">
        <button className="px-4 py-1 text-black bg-blue-100 my-4 rounded flex gap-2 items-center tracking-wide">
          SUBMIT
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-5"
          >
            <path
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8
               0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5
               32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg>
        </button>
      </div>
      {error && <p className='text-center mb-2 text-red-400'>{error}</p>}
      {msg && <p className='text-center mb-2 text-blue-400'>{msg}</p>}
    </fetcher.Form>
  )
}

export default ReportAProblem