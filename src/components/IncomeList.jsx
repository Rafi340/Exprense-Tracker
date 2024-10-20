//import { useState } from "react";
import DateFormat from "../utils/DateFormat";
import Filter from "./Filter";
import { DeleteIcon, EditIcon, IncomeIcon } from "./Icon";
import Sorting from "./Sorting";

const IncomeList = ({ transactions, onEdit }) => {
  //const [showFilter, setShowCategory] = useState(false);
  return (
    <>
      <div className="border rounded-md relative">
        <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
          {/* <!-- Header --> */}
          <div className="flex items-center gap-2">
            {/* <!-- Icon --> */}
            <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
              <IncomeIcon />
            </div>
            {/* <!-- Text --> */}
            <div>
              <h3 className="text-xl font-semibold leading-7 text-gray-800">
                Income
              </h3>
            </div>
          </div>
          <div>
            {" "}
            <Sorting />
            <Filter transactionType={2} />{" "}
          </div>
        </div>
        <div className="p-4 divide-y">
          {/* <!-- Row -->
                <!-- Row --> */}
          {transactions
            ?.filter((x) => x.transactionType == 2)
            ?.map((t) => (
              <div
                className="flex justify-between items-center py-2 relative group cursor-pointer"
                key={t.id}
              >
                <div>
                  <h3 className="text-base font-medium leading-7 text-gray-600">
                    {t.category}
                  </h3>
                  <p className="text-xs text-gray-600">{DateFormat(t.date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                    BDT {t.amount}
                  </p>

                  {/* <!-- 3 Dots --> */}
                  <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                    <button
                      className="hover:text-teal-600"
                      role="button"
                      title="Edit Button"
                      onClick={() => onEdit(t)}
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="hover:text-red-600"
                      role="button"
                      title="Delete"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default IncomeList;
