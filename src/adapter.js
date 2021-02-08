import { validations } from './validation';

export const adaptCSVData = (data = []) => {
    if (!data?.length)
        return [];

    return {
        columns: ['ID', 'Duplicate', ...Object.keys(data[0])],
        rows: data.map((row, index) => {
            return Object.keys(row).reduce((acc, rowStr) => {
                return ({
                    ...acc,
                    [rowStr]: validations(row, rowStr, row[rowStr]),
                    ID: { value: index + 1, valid: true },
                })
            }, {})
            // CHECK FOR DUPLICATES
        }).map((item, i, modRows) => ({
            ...item,
            Duplicate: (() => {
                const findRow = modRows.find((modItem) => (
                    modItem.ID !== item.ID && (modItem.phone.value === item.phone.value || modItem.email.value === item.email.value)
                ));

                return ({
                    value: findRow ? findRow.ID.value : '',
                    valid: true
                })
            })()
        }))
    };
};
