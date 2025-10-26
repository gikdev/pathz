interface ErrorBoxProps {
  message: string
  details?: string
}

export const ErrorBox = ({ message, details }: ErrorBoxProps) => (
  <div className="border border-red-400 bg-red-50 text-red-800 p-2 rounded-md text-sm font-mono">
    <p>{message}</p>
    {details && <pre className="text-xs opacity-70">{details}</pre>}
  </div>
)
