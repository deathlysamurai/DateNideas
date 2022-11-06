import { FlatList } from 'react-native';
import { container } from '../../static/styles';
import { firebase } from '../../database/functions';
import { useEffect } from 'react';
import DateListItem from './DateListItem';
import { useState } from 'react';

export default function DateList(props) {
    const [dates, setDates] = useState(null);

    useEffect(() => {
        if(props.filteredDates) {
            setDates(props.filteredDates);
        } else {
            firebase.date.getCurrentUserDates()
            .then((dates) => { setDates(dates) });
        }
    });

    return (
        <FlatList
            data={dates}
            renderItem={({ item }) => <DateListItem date={item} />}
        />
    )
}