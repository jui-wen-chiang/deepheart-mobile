import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import RadarChart from '@/components/chart/InteractiveRadar';
import RadarChartT from '@/components/chart/test';
import ParallaxScrollView from '@/components/ui/theme/ParallaxScrollView'

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    baseContainer: {
        height: 'auto',
        width: '100%'
    },
});

export default function TestScreen() {
    //  ipconfig getifaddr en0 (只顯示 LAN IP)
    // React Native 在模擬器/真機跑時，不能用 localhost，要改成你電腦的局域網IP，例如 192.168.1.100:8000

    // Test to retrieve data from the backend
    // iOS 模擬器可以用 localhost
    // Android 模擬器通常要用 10.0.2.2 才能訪問本機
    // 真機測試要用 LAN IP (192.168.x.x)
    // const [backenmessage, setBackenmessage] = useState("");
    // useEffect(() => {
    //   fetch("http://127.0.0.1:8000/hello")
    //     .then(res => res.json())
    //     .then(data => setBackenmessage(data.message))
    //     .catch(err => console.log(err))
    // }, []);

    return (
        <ParallaxScrollView>
            <View>
                {/* Test to retrieve data from the backend */}
                {/* <ThemedView style={styles.stepContainer}>
                <ThemedText type="title">{backenmessage}</ThemedText>
            </ThemedView> */}


                {/* <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
                    Press{' '}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({
                            ios: 'cmd + d',
                            android: 'cmd + m',
                            web: 'F12',
                        })}
                    </ThemedText>{' '}
                    to open developer tools.
                </ThemedText>
            </ThemedView> */}

                <View>
                    <Text>RadarChart</Text>
                    {/* <ThemedText type="title">RadarChart</ThemedText>
                <ThemedText type="title"></ThemedText>
                <ThemedText type="title"></ThemedText>
                <ThemedText type="title"></ThemedText>
                <ThemedText type="title"></ThemedText>
                <RadarChartT /> */}
                    {/* <RadarChart /> */}
                </View>
            </View>
        </ParallaxScrollView >
    );
}