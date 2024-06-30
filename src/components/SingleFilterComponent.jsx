import React, { useState } from "react";

function SingleFilterComponent({
  title,
  filterOption,
  appliedFilters,
  handleFilterChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex justify-between  px-2 font-bold my-2"
        onClick={() => setIsOpen((state) => !state)}
      >
        {" "}
        <p>{title}</p>{" "}
        <p className="text-xl cursor-pointer">{isOpen ? "-" : "+"}</p>{" "}
      </div>

      {isOpen && (
        <div className="max-h-52 overflow-scroll border  py-2	">
          {filterOption?.length > 0 &&
            filterOption?.map((singleFilter) => {
              return (
                <div className="p-1">
                  <label htmlFor={singleFilter?.value} className="block">
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleFilterChange(
                          singleFilter?.code,
                          singleFilter?.value
                        )
                      }
                      id={singleFilter?.value}
                      checked={
                        appliedFilters[singleFilter?.code]
                          ? appliedFilters[singleFilter?.code].includes(
                              singleFilter?.value
                            )
                          : false
                      }
                      className="mr-2"
                    />
                    {singleFilter?.value}
                  </label>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default SingleFilterComponent;
