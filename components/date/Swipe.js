import { View, PanResponder, Animated } from 'react-native';
import { container } from '../../static/styles';
import { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card';
import { sql } from '../../database/functions';
import { CARD, ACTION_OFFSET, HEIGHT_ACTION_OFFSET } from '../../static/variables';

export default function SwipeScreen(props) {
  const [dates, setDates] = useState(null);
  const position = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [like, setLike] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    // Change to only get dates from today, that have not already been looked at
    sql.date.getCurrentUserDates()
    .then((dates) => { setDates(dates) });
  }, []);
  useEffect(() => {
    if(currentDate) { 
      console.log(like);
      console.log("DATE: "+currentDate) 
    }
    if(dates && dates.length > 0) {
      setCurrentDate(dates[0].id);
    }
  }, [dates]);

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      tiltSign.setValue(gestureState.y0 > CARD.HEIGHT / 2 ? 1 : -1);
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      const direction = Math.sign(dx);
      setLike(direction == 1 ? true : false);
      const userAction = Math.abs(dx) > ACTION_OFFSET;
      const chooseDate = -dy > HEIGHT_ACTION_OFFSET;

      if (chooseDate) {
        Animated.timing(position, {
          duration: 200,
          toValue: {
            x: dx,
            y: -CARD.OUT_HEIGHT,
          },
          useNativeDriver: true,
        }).start(transitionNext);
      } else if (userAction) {
        Animated.timing(position, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_WIDTH,
            y: dy,
          },
          useNativeDriver: true,
        }).start(transitionNext);
      } else {
        Animated.spring(position, {
          friction: 5,
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
        }).start();
      }
    }
  })).current;

  const transitionNext = useCallback(() => {
    setDates((prevState) => prevState.slice(1));
    position.setValue({ x: 0, y: 0 });
  }, [position]);

  return (
    <View style={container.container}>
        {dates ? dates.map((date, index) => {
          return <Card 
                    key={date.id} 
                    date={date}
                    position={position}
                    panResponder={panResponder}
                  />
        }).reverse() : null}
    </View>
  )
}