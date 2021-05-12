import { Message } from '@prisma/client'
import axios from 'axios'

interface ShowMessageProps {
  msg: Message
  authorId: number
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>
}

const ShowMessage: React.FC<ShowMessageProps> = ({ msg, authorId, mutate }) => {
  return (
    <div
      className={`flex justify-between items-center px-4 py-1 my-2 rounded-lg ${
        authorId === msg.authorId ? 'bg-cyan-600 text-white' : 'bg-gray-200'
      }`}
    >
      <p className="font-semibold px-2 py-1">{msg.content}</p>
      {authorId === msg.authorId && (
        <button
          className="bg-transparent"
          onClick={async () => {
            await axios.post('/api/delete-msg', {
              id: msg.id,
              authorId,
            })
            await mutate()
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ShowMessage
