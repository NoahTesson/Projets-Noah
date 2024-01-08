import React, { useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import Animated,{ FadeInUp, FadeOutUp} from 'react-native-reanimated'
import { CheckBox } from 'react-native-elements';

function ModalFilter({ work }) {
    const [checkboxStates, setCheckboxStates] = useState(
        work.reduce((acc, work) => {
            acc[work] = false;
            return acc;
        }, {})
    );

    const handleCheckBoxToggle = (work) => {
        setCheckboxStates({
            ...checkboxStates,
            [work]: !checkboxStates[work],
        });
    };

    return(
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={styles.animated}
        >
            <ScrollView
                style={styles.scrollViewContent}
            >
                {work.map((work, index) => (
                    <CheckBox 
                        key={index}
                        checked={checkboxStates[work]}
                        onPress={() => handleCheckBoxToggle(work)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                        title={<Text style={styles.textCheckBox}>{work}</Text>}
                    />
                ))}
            </ScrollView>
      </Animated.View>
    )
}

const styles = StyleSheet.create({
    animated: {
        flex: 4,
        borderRadius: 25,
        marginTop: "10%",
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    textCheckBox: {
        fontSize: 12,
    },
});

export default ModalFilter;