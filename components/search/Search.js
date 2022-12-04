import { View, Text } from 'react-native';
import { container } from '../../static/styles';
import DateList from '../etc/DateList';
import { sql } from '../../database/functions';
import { useEffect, useState } from 'react';

export default function SearchScreen(props) {
  const [allDates, setAllDates] = useState(null);

  useEffect(() => {
    sql.date.getAllDates()
      .then((dates) => setAllDates(dates));
  });

  return (
    <View style={container.container}>
        <DateList filteredDates={allDates} navigation={props.navigation} />
    </View>
  )
}