interface Props {
  isDisabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ isDisabled }) => (
  <button
    className={`w-5/6 py-5 bg-blue-200 duration-300 rounded-md ${
      !isDisabled &&
      "bg-blue-400 text-white hover:bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 duration-300 hover:text-black hover:font-bold"
    }`}
    disabled={isDisabled}
    data-testid="submitButton"
  >
    Create Set
  </button>
);

export default SubmitButton;
