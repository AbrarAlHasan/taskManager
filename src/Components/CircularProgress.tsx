import {View} from 'react-native';
import React from 'react';
import Svg, {Circle, Text, G} from 'react-native-svg';

const CircularProgress = ({...props}) => {
  const {size} = props;
  const r = 35 * size;
  const x = 50 * size;
  const y = 50 * size;
  const length = 2 * Math.PI * r;
  const strokeWidth = r - r * 0.55;
  const width = r * 2.8;

  return (
    <Svg width={width} height={width}>
      <Circle
        fill={'#fff'}
        cx={x}
        cy={y}
        r={r}
        strokeWidth={strokeWidth}
        stroke={'#E6E6E6'}
      />
      <Circle
        fill={'transparent'}
        cx={x}
        cy={y}
        r={r}
        strokeWidth={strokeWidth - strokeWidth * 0.3}
        stroke={'#18B797'}
        strokeDasharray={length}
        strokeDashoffset={length * 0.3}
        strokeLinecap="round"
      />
      <G transform={`translate(${x},${x})`}>
        <Text
          textAnchor="middle" // Center the text horizontally
          fontSize={r * 0.4} // Set the font size as a proportion of the radius
          fontWeight="bold"
          fill="#000">
          13/20
        </Text>
      </G>
      <G transform={`translate(${x},${x * 1.3})`}>
        <Text
          textAnchor="middle" // Center the text horizontally
          fontSize={r * 0.3} // Set the font size as a proportion of the radius
          fontWeight="light"
          fill="#000">
          Tasks
        </Text>
      </G>
    </Svg>
  );
};

export default CircularProgress;
