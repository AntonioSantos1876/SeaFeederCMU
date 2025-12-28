import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../theme';

export const CMUFooter = () => {
    const theme = useAppTheme();
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
                Developed by CMU Final Year Students
            </Text>
            <Text style={[styles.subText, { color: theme.colors.textSecondary }]}>
                v1.1.0 • © 2025 All Rights Reserved
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        opacity: 0.7,
        textAlign: 'center'
    },
    subText: {
        fontSize: 10,
        marginTop: 4,
        opacity: 0.5
    }
});
