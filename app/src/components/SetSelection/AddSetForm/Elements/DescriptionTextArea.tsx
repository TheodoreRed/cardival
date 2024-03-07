interface Props {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionTextArea: React.FC<Props> = ({
  description,
  setDescription,
}) => (
  <textarea
    rows={5}
    id="description"
    name="description"
    placeholder="Add a description (optional)"
    className="w-5/6 p-5 my-5 rounded-md resize-none text-md bg-slate-100"
    value={description}
    draggable={false}
    onChange={(e) => setDescription(e.target.value)}
    data-testid="descriptionTextArea"
  />
);

export default DescriptionTextArea;
