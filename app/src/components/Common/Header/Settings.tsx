import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditSettings from "./EditSettings";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCardSet } from "../../../hooks/useCardSet";

interface Props {
  setDisplayModal: (b: boolean) => void;
}

const Settings = ({ setDisplayModal }: Props) => {
  const [edit, setEdit] = useState(false);
  const { cardsetid } = useParams();

  const { activeSet } = useCardSet(cardsetid ?? "");

  if (!activeSet) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <FontAwesomeIcon
        className="absolute p-2 text-lg transition duration-300 ease-in-out bg-white rounded-full cursor-pointer top-3 right-3 hover:bg-brightYellow"
        icon={faPencil}
        onClick={() => setEdit((prev) => !prev)}
      />
      {edit ? (
        <EditSettings setDisplayModal={setDisplayModal} activeSet={activeSet} />
      ) : (
        <div className="flex flex-col items-center py-5 mt-3 h-fit">
          <div>
            <h2 className="text-3xl text-center">{activeSet.title}</h2>
            <p className="px-10 pt-3 text-center">{activeSet.description}</p>
          </div>
          <table className="w-1/2 border border-collapse border-gray-200 table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200">
                  Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">
                  Cards
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 border-b border-gray-200 whitespace-nowrap">
                  {activeSet.cards.length}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">
                  Quizzes
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 border-b border-gray-200 whitespace-nowrap">
                  {activeSet.quizzes.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Settings;
