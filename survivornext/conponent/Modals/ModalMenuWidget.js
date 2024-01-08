import React from 'react';
import { View, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';

import WidgetMenu from '../Widgets/widgetMenu';

function ModalMenuWidget(props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.menuWidget}
            onRequestClose={() => props.changeModalMenu(false)}
        >
            <Pressable
                style={styles.pressable}
                onPress={() => props.setmenuWidget(false)}
            />
            <View style={styles.containerScrollview}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <WidgetMenu widgetToDisplay={props.widgetToDisplay} setmenuWidget={props.setmenuWidget}/>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    containerScrollview: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    scrollView: {
        height: '100%',
        width: '100%',
    },
});

export default ModalMenuWidget;