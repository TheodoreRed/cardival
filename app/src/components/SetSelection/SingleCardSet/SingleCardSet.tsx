import CardSet from "../../../models/Card/CardSet";

interface Props {
  cardSet: CardSet;
}

const SingleCardSet = ({ cardSet }: Props) => {
  return (
    <li
      className="flex flex-col justify-between px-5 py-5 my-10 duration-300 ease-in-out rounded-md shadow-md cursor-pointer hover:shadow-2xl text-l bg-slate-200 h-fit hover:bg-slate-100"
      key={cardSet.title}
      data-testid="cardSetItem"
    >
      <h2 className="text-4xl font-bold text-center" data-testid="cardSetTitle">
        {cardSet.title}
      </h2>
      {cardSet.description !== "" && (
        <p
          className="pt-5 font-sans text-2xl font-light"
          data-testid="cardSetDescription"
        >
          {cardSet.description}
        </p>
      )}
    </li>
  );
};
export default SingleCardSet;
