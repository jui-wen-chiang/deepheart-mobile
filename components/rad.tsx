import React, { useRef, useState } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import Svg, { Polygon, Circle } from "react-native-svg";

const SIZE = 300; // 畫布大小
const CENTER = SIZE / 2; // 中心點
const RADIUS = 100; // 預設半徑
const SIDES = 5; // 多邊形邊數（五邊形）

// 計算初始頂點座標
const getInitialPoints = () => {
    return Array.from({ length: SIDES }).map((_, i) => {
        const angle = (2 * Math.PI * i) / SIDES - Math.PI / 2; // 旋轉起點在正上方
        return {
            x: CENTER + RADIUS * Math.cos(angle),
            y: CENTER + RADIUS * Math.sin(angle),
        };
    });
};

export default function RadarChart() {
    const [points, setPoints] = useState(getInitialPoints());

    // 紀錄目前拖曳中的點
    const activeIndex = useRef(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                // 找到點擊最近的頂點
                const idx = points.findIndex(
                    (p) =>
                        Math.hypot(p.x - locationX, p.y - locationY) < 20 // 點擊範圍 20px
                );
                if (idx !== -1 && activeIndex != null) { (activeIndex as any).current = idx; }
            },
            onPanResponderMove: (evt) => {
                if (activeIndex.current !== null) {
                    const { locationX, locationY } = evt.nativeEvent;
                    const newPoints = [...points];
                    newPoints[activeIndex.current] = { x: locationX, y: locationY };
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
                {/* 多邊形 */}
                <Polygon
                    points={polygonPoints}
                    fill="rgba(0,150,255,0.3)"
                    stroke="blue"
                    strokeWidth="2"
                />
                {/* 頂點圓圈 */}
                {points.map((p, idx) => (
                    <Circle key={idx} cx={p.x} cy={p.y} r="10" fill="red" />
                ))}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
