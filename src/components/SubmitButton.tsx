interface SubmitButtonProps {
  title: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  return (
    <button className="btn" type="submit">
      {title}
    </button>
  )
}

export default SubmitButton
