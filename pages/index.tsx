import { Table } from 'antd';
import React, { useState } from 'react';
import { ReactNode } from 'react';
import data from '../data/data.json';
import towns from '../data/towns.json';
import developments from '../data/developments.json';

class FilterDto {
    text: unknown;
    value: unknown;

    constructor (value: unknown) {
        this.text = value;
        this.value = value;
    }
}

export default function Home (): ReactNode {
    const formatter = new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: 0 });
    const [developmentFilters] = useState(developments.sort().map(development => new FilterDto(development)));
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
            filters: towns.map(town => new FilterDto(town)),
            onFilter: (value, record) => {
                return record.town === value;
            }
        },
        {
            title: 'Type',
            dataIndex: 'room_type',
            key: 'room_type',
            filters: typeFilters.map(value => new FilterDto(value)),
            onFilter: (value, record) => {
                return record.room_type === value;
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
            render: availability => <span>{availability ? 'Yes' : 'No'}</span>
        },
        {
            title: 'Chinese Quota',
            dataIndex: 'chinese_quota',
            key: 'chinese_quota',
        },
        {
            title: 'Malay Quota',
            dataIndex: 'malay_quota',
            key: 'malay_quota',
        },
        {
            title: 'Indian and Others Quota',
            dataIndex: 'indian_and_others_quota',
            key: 'indian_and_others_quota',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => <span>{formatter.format(price)}</span>
        },
    ];

    return (
        <Table
            dataSource={flats}
            columns={COLUMNS}
        />
    );
}
