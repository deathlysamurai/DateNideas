import { FlatList } from 'react-native';
import { container } from '../../static/styles';
import { firebase, sql } from '../../database/functions';
import { useEffect } from 'react';
import DateListItem from './DateListItem';
import { useState } from 'react';

export default function DateList(props) {
    const [dates, setDates] = useState(null);

    useEffect(() => {
        if(props.filteredDates) {
            setDates(props.filteredDates);
        } else {
            sql.date.getCurrentUserDates()
            .then((dates) => { 
                setDates(dates) 
            });
        }
    });

    return (
        <FlatList
            contentContainerStyle={[container.container, container.scrollViewContainer]}
            data={dates}
            renderItem={({ item }) => <DateListItem date={item} navigation={props.navigation} />}
        />
    )
}