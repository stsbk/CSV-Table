import moment from 'moment';

const DATE_FORMATS = [
    'YYYY-MM-DD',
    'MM/DD/YYYY'
];

const HAS_CHILDREN = 'TRUE';
const NO_CHILDREN = 'FALSE';

const checkDate = (date) => {
    return DATE_FORMATS.some((dateFormat) => {
        const momentDate = moment(date, dateFormat, true);

        return (
            momentDate.isValid() && momentDate > moment()
        )
    })
};

export const validations = (row, columnName, column) => {
    switch (columnName) {
        case 'full_name':
            return ({
                value: column,
                valid: column ? !!column : 1
            });
        case 'phone':
            return ({
                value: '+1' + `${column}`.replace(/^\+1|^1/, ''),
                valid: column ? `${column}`.replace(/^\+1|^1/, '').length === 10 : '',
            });
        case 'email':
            return ({
                value: column,
                valid: column
                    ? `${column}`.
                    match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)
                    : 1
            });
        case 'age':
            return ({
                value: column,
                valid: !Number.isNaN(Number(column)) && column >= 21
            });
        case 'experience':
            return ({
                value: column,
                valid: !Number.isNaN(Number(column)) && column >= 0 && column < row.age
            });
        case 'yearly_income':
            return ({
                value: !Number.isNaN(Number(column)) ? column.toFixed(2) : 0,
                valid: !Number.isNaN(Number(column)) && column <= 1000000
            });
        case 'expiration_date':
            return ({
                value: column,
                valid: column ? checkDate(column) : 1
            });
        case 'license_number':
            return ({
                value: column,
                valid: column ? column.length === 6 : 1
            });
        case 'license_states':
            return ({
                value: column
                    ? column.split(',')
                        .map((val) => val.trim().length > 2 ? val.trim().slice(0, 2).toUpperCase() : val).join(' | ')
                    : '',
                valid: column ? `${column}`.trim().length >= 2 : 1
            });
        case 'has_children':
            return ({
                value: column ? HAS_CHILDREN : NO_CHILDREN,
                valid: typeof column === 'boolean'
            });
        default:
            return ({
                value: column,
                valid: true
            });

    }
};
