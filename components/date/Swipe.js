import { View } from 'react-native';
import { container } from '../../static/styles';
import { useState, useEffect } from 'react';
import Card from './Card';
import { sql } from '../../database/functions';

export default function SwipeScreen(props) {
  const [dates, setDates] = useState(null);

    useEffect(() => {
      // Change to only get dates from today, that have not already been looked at
      sql.date.getCurrentUserDates()
      .then((dates) => { setDates(dates) });
    });

  return (
    <View style={container.container}>
        {dates ? dates.map((date) => {
          return <Card 
          key={date.id}
          date={date} />
        }) : null}
    </View>
  )
}