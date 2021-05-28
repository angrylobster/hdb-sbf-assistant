import { Table } from 'antd';
import React, { useState } from 'react';
import { ReactNode } from 'react';
import data from '../data/data.json';
import towns from '../data/towns.json';
import developments from '../data/developments.json';

function createFilter (value: string) {
    return {
        text: value,
        value,
    };
}

type FlatData = {
    price: number;
    chinese_quota: number;
    malay_quota: number;
    indian_and_others_quota: number;
}

export default function Home (): ReactNode {
    const formatter = new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: 0 });
    const [developmentFilters] = useState(developments);
    const [typeFilters] = useState(['2-room Flexi','3-room','4-room','5-room','3Gen','Executive']);
    const [flats, setFlats] = useState(data);
    const COLUMNS = [
        {
            title: 'Development',
            dataIndex: 'project',
            key: 'project',
            filters: developmentFilters,
            onFilter: (value, record) => {
                return record.project === value;
            },
        },
        {
            title: 'Town',
            dataIndex: 'town',
            key: 'town',
            filters: towns.map(town => createFilter(town)),
            onFilter: (value, record) => {
                return record.town === value;
            }
        },
        {
            title: 'Type',
            dataIndex: 'flat_type',
            key: 'flat_type',
            filters: typeFilters.map(value => createFilter(value)),
            onFilter: (value, record) => {
                return record.flat_type === value;
            }
        },
        {
            title: 'Block',
            dataIndex: 'block',
            key: 'block',
        },
        {
            title: 'Street Address',
            dataIndex: 'street',
            key: 'street',
        },
        {
            title: 'Floor',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Unit Number',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Lease',
            dataIndex: 'remaining_lease',
            key: 'remaining_lease',
        },
        {
            title: 'Keys Available',
            dataIndex: 'keys_available',
            key: 'keys_available',
            render: availability => <span>{availability ? 'Yes' : 'No'}</span>,
            width: 100
        },
        {
            title: 'Chinese Quota',
            dataIndex: 'chinese_quota',
            key: 'chinese_quota',
            width: 100,
            sorter: (firstValue: FlatData, secondValue: FlatData) => firstValue.chinese_quota - secondValue.chinese_quota,
        },
        {
            title: 'Malay Quota',
            dataIndex: 'malay_quota',
            key: 'malay_quota',
            width: 100,
            sorter: (firstValue: FlatData, secondValue: FlatData) => firstValue.malay_quota - secondValue.malay_quota,
        },
        {
            title: 'Indian and Others Quota',
            dataIndex: 'indian_and_others_quota',
            key: 'indian_and_others_quota',
            width: 150,
            sorter: (firstValue: FlatData, secondValue: FlatData) => firstValue.indian_and_others_quota - secondValue.indian_and_others_quota,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => <span>{formatter.format(price)}</span>,
            sorter: (firstValue: FlatData, secondValue: FlatData) => firstValue.price - secondValue.price,

        },
    ];

    return (
        <Table
            dataSource={flats}
            columns={COLUMNS}
        />
    );
}
