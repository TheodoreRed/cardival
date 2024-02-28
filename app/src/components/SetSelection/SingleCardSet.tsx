import CardSet from "../../models/Card/CardSet";

interface Props {
  cardSet: CardSet;
}

const SingleCardSet = ({ cardSet }: Props) => {
  return (
    <li
      className="flex flex-col justify-between px-5 py-5 my-3 break-all duration-300 ease-in-out rounded-md shadow-md cursor-pointer hover:shadow-2xl text-l bg-slate-300 h-fit hover:bg-slate-100"
      key={cardSet.title}
    >
      <h2 className="text-4xl font-bold text-center">{cardSet.title}</h2>
      {cardSet.description !== "" && (
        <p className="w-3/4 pt-5 font-sans text-2xl font-light">
          {cardSet.description}
        </p>
      )}
    </li>
  );
};
export default SingleCardSet;
