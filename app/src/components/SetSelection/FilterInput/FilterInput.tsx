interface Props {
  inputText: string;
  setInputText: (s: string) => void;
}

const FilterInput = ({ inputText, setInputText }: Props) => {
  return (
    <div className="my-5 w-5/6">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Search sets..."
        className="px-4 w-full py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm "
        data-testid="filterInput"
      />
    </div>
  );
};

export default FilterInput;
