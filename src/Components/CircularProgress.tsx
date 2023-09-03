import {View} from 'react-native';
import React from 'react';
import Svg, {Circle, Text, G} from 'react-native-svg';

const CircularProgress = ({...props}) => {
  const {size, labelName, current, total, labelNumber} = props;
  const r = 35 * size;
  const x = 50 * size;
  const y = 50 * size;
  const length = 2 * Math.PI * r;
  const strokeWidth = r - r * 0.55;
  const width = r * 2.8;
  const percentage = current == 0 && total == 0 ? 0 : (current / total) * 100;
  const strokeDashoffset = length - (length * percentage) / 100;

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
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      <G transform={`translate(${x},${labelName ? x : x * 1.1})`}>
        <Text
          textAnchor="middle" // Center the text horizontally
          fontSize={r * 0.4} // Set the font size as a proportion of the radius
          fontWeight="bold"
          fill="#000">
          {labelNumber}
        </Text>
      </G>
      <G transform={`translate(${x},${x * 1.3})`}>
        <Text
          textAnchor="middle" // Center the text horizontally
          fontSize={r * 0.4} // Set the font size as a proportion of the radius
          fill="#000">
          {labelName}
        </Text>
      </G>
    </Svg>
  );
};

export default CircularProgress;
