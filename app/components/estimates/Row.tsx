import { FieldArrayWithId } from "react-hook-form";


interface EstimateRowProps {
    list: any;
}

const Row = ({list}: EstimateRowProps) => {
    let _list = [];

    for (const row of list) {
        if (!row.work.length || !row.price.length) {
            continue;
        }

        _list.push(row);
    }
    return (<>{_list.map((item: any, index: number) => (
        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.work}
            </th>
            <td className="px-6 py-4">
                {item.price}
            </td>
        </tr>
    ))}</>)
}

export default Row;