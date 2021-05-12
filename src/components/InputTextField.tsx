import { InputHTMLAttributes } from 'react'

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

const InputTextField: React.FC<InputTextFieldProps> = ({ label, ...props }) => {
  return (
    <div className="my-2">
      <label className="px-2 py-2 font-semibold text-lg">{label}</label>
      <input
        {...props}
        className="p-2 w-full font-semibold my-2 border-2 border-cyan-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-600"
      />
    </div>
  )
}

export default InputTextField
