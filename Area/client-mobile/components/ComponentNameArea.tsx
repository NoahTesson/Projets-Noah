import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native';

type ComponentNameAreaProps = {
    nameArea: string;
    setNameArea: React.Dispatch<React.SetStateAction<string>>;
}

const ComponentNameArea: React.FC<ComponentNameAreaProps> = ({ nameArea, setNameArea }) => {
    return (
        <View style={styles.searchSection}>
            <TextInput
                style={[styles.TextInput_research, styles.shadow]}
                onChangeText={setNameArea}
                value={nameArea}
                placeholder="Enter Area Name"
                placeholderTextColor="grey"
                maxLength={20}
            />
        </View> 
    )
}

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    TextInput_research: {
        width: '90%',
        height: '60%',
        fontSize: 17,
        paddingLeft: '3%',
        borderRadius: 15,
        backgroundColor: '#98C1FE',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default ComponentNameArea;