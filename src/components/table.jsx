import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ascending, descending } from "../utils/sort";
import Arrow from "./arrow";

/**
 *
 * @return {*}
 * @constructor
 */
function Table(props) {
    let [{rows, columns}, setValues] = useState({
        columns: props.columns,
        rows: props.rows.filter((row) => row.confirmed > 0),
    });

    rows = rows.filter((row) => row.confirmed > 0);

    useEffect(() => {
        setValues({
            columns: props.columns.slice(0),
            rows: props.rows.slice(0),
        });
    }, [props]);

    const sortRows = function (event) {
        let thisElement = event.currentTarget,
            {prop} = thisElement.dataset;

        let asc = (thisElement.ascending = !thisElement.ascending);
        let sorted = rows.slice(0).sort(function (a, b) {
            return asc
                ? descending(a[prop], b[prop])
                : ascending(a[prop], b[prop]);
        });
        setValues({
            rows: sorted,
            columns,
        });
    };

    return (
        <table className="w-full">
            <tbody className="text-xs leading-tight border-b-2 cursor-pointer">
                <tr>
                    {columns.map((column) => (
                        <th
                            className="capitalize border px-2 py-2 sort-by sticky bg-white"
                            key={column.name}
                            onClick={sortRows}
                            data-prop={column.accessor}
                            title="Click to sort"
                        >
                            {column.name}
                        </th>
                    ))}
                </tr>
            </tbody>
            <tbody className="font-bold">
                {rows.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, j) => {
                            let columnName = column.accessor,
                                colorClass = column.colorClass,
                                todayCount = 0,
                                count = row[columnName],
                                extraClass = '';

                            if (row.today) {
                                todayCount = row.today[columnName];
                            }

                            if (row.district === 'Unknown') {
                                extraClass = `bg-${colorClass}-200 text-${colorClass}-600`;
                            }

                            //
                            if (props.link && j === 0) {
                                count = (
                                    <Link to={`/state/${row.stateCode}`}>
                                        {count}
                                    </Link>
                                );
                            }

                            return (
                                <td
                                    key={j}
                                    className={`${
                                        j === 0 ? 'bg-gray-200' : 'text-right'
                                    }  text-2xs border px-2 py-2 ${extraClass}`}
                                >
                                    <span>
                                        {j > 0 && todayCount ? (
                                            <span
                                                className={` mr-1 text-${colorClass}-600 break-words`}
                                            >
                                                <Arrow up={todayCount > 0} />
                                                <span>{todayCount}</span>
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                    <span className="text-sm">{count}</span>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
