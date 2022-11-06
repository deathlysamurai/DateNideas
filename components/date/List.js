import { useState } from 'react';
import { View, Text } from 'react-native';
import { container } from '../../static/styles';
import DateFilters from '../etc/DateFilters';
import DateList from '../etc/DateList';

export default function ListScreen(props) {
  const [filteredDates, setFilteredDates] = useState(null);

  const filterDates = (filteredDates) => {
    setFilteredDates(filteredDates);
  }

  return (
    <View style={container.container}>
        <DateFilters filterDates={filterDates} />
        <DateList filteredDates={filteredDates} />
    </View>
  )
}