import React from "react";

const TableSkeleton = ({ rows = 5, colSpan = 4 }) => {
  const placeholderRows = Array.from({ length: rows }, (_, index) => (
    <React.Fragment key={index}>
      <tr style={{ zIndex: "0" }}>
        <td colSpan={colSpan}></td>
      </tr>
      <tr style={{ zIndex: "0" }}>
        <td colSpan={colSpan} className="bg-gray-200 animate-pulse h-6"></td>
      </tr>
    </React.Fragment>
  ));

  return <tbody>{placeholderRows}</tbody>;
};

export default TableSkeleton;
