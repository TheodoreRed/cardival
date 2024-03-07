interface Props {
  title: string;
  setTitle: (title: string) => void;
  checkForDuplicateTitle: (title: string) => void;
}

const TitleInput: React.FC<Props> = ({
  title,
  setTitle,
  checkForDuplicateTitle,
}) => (
  <input
    type="text"
    id="title"
    name="title"
    placeholder="Enter Set Title (e.g., 'History', 'Calculus')"
    className="w-5/6 p-5 my-5 rounded-md text-md bg-slate-100"
    value={title}
    onChange={(e) => {
      setTitle(e.target.value);
      checkForDuplicateTitle(e.target.value);
    }}
    data-testid="titleInput"
  />
);

export default TitleInput;
