import React from 'react';
import classNames from 'classnames';

export const Table = ({ data }) => {
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    {data?.columns?.map((column) => <th key={column} className='bg-info'>{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {data?.rows?.map((row) => (
                    <tr key={row.ID.value}>
                        {data?.columns?.map((column) => (
                            <td key={row[column]?.value} className={classNames('table-row__column', { 'is_invalid': !row[column]?.valid })}>{row[column]?.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
