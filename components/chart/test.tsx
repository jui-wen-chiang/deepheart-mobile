import React, { useRef, useState } from "react";
import { View, PanResponder, StyleSheet, Text } from "react-native";
import Svg, { Polygon, Circle, Line, Text as SvgText } from "react-native-svg";

const SIZE = 500;
const CENTER = SIZE / 2;
const MAX_RADIUS = 100; // 最大半徑
const SIDES = 6;

const getInitialPoints = () => {
  return Array.from({ length: SIDES }).map((_, i) => {
    const angle = (2 * Math.PI * i) / SIDES - Math.PI / 2;
    return {
      angle,
      value: 50, // 預設值 0~100
      x: CENTER + (50 / 100) * MAX_RADIUS * Math.cos(angle),
      y: CENTER + (50 / 100) * MAX_RADIUS * Math.sin(angle),
    };
  });
};

export default function RadarChart() {
  const [points, setPoints] = useState(getInitialPoints());
  const activeIndex = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const idx = points.findIndex(
          (p) =>
            Math.hypot(p.x - locationX, p.y - locationY) < 15
        );
        if (idx !== -1 && activeIndex!=null) (activeIndex as any).current = idx;
      },
      onPanResponderMove: (evt) => {
        if (activeIndex.current !== null) {
          const { locationX, locationY } = evt.nativeEvent;
          const newPoints = [...points];
          const { angle } = newPoints[activeIndex.current];

          // 計算拖曳到的半徑
          const dx = locationX - CENTER;
          const dy = locationY - CENTER;
          let newRadius = Math.sqrt(dx * dx + dy * dy);
          // 限制最小最大值
          newRadius = Math.max(0, Math.min(newRadius, MAX_RADIUS));

          const value = Math.round((newRadius / MAX_RADIUS) * 100);

          newPoints[activeIndex.current] = {
            angle,
            value,
            x: CENTER + newRadius * Math.cos(angle),
            y: CENTER + newRadius * Math.sin(angle),
          };
          setPoints(newPoints);
        }
      },
      onPanResponderRelease: () => {
        activeIndex.current = null;
      },
    })
  ).current;

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} {...panResponder.panHandlers}>
        {/* 背景圈 */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <Polygon
            key={i}
            points={Array.from({ length: SIDES })
              .map(
                (_, j) =>
                  `${CENTER + MAX_RADIUS * ratio * Math.cos(
                    (2 * Math.PI * j) / SIDES - Math.PI / 2
                  )},${CENTER + MAX_RADIUS * ratio * Math.sin(
                    (2 * Math.PI * j) / SIDES - Math.PI / 2
                  )}`
              )
              .join(" ")}
            stroke="lightgray"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* 中心到頂點線 */}
        {points.map((p, idx) => (
          <Line
            key={idx}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            stroke="lightgray"
            strokeWidth="1"
          />
        ))}

        {/* 多邊形 */}
        <Polygon
          points={polygonPoints}
          fill="rgba(0,150,255,0.3)"
          stroke="blue"
          strokeWidth="2"
        />

        {/* 可拖曳頂點 */}
        {points.map((p, idx) => (
          <Circle key={idx} cx={p.x} cy={p.y} r="10" fill="red" />
        ))}

        {/* 顯示每個頂點的數值 */}
        {points.map((p, idx) => (
          <SvgText
            key={idx}
            x={p.x}
            y={p.y - 15} // 顯示在頂點上方
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            {p.value}
          </SvgText>
        ))}

        {/* 背景圈數值標記 */}
        {[25, 50, 75, 100].map((v, i) => (
          <SvgText
            key={i}
            x={CENTER}
            y={CENTER - (MAX_RADIUS * v) / 100 - 5}
            fontSize="10"
            fill="gray"
            textAnchor="middle"
          >
            {v}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
