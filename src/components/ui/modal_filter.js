import { View, Text, Modal } from 'react-native';
import Close from './close';


const ModalFilter = (props) => {

    const modal = (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visibleModal}
            onRequestClose={props.setvisibleModal}
        >
        <View style={{flex: 1, alignItems:"flex-end",justifyContent: 'flex-end' ,backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <View>
                <View style={{flex: 1, Width: "100%", maxHeight: "80%",backgroundColor:"#F7F7F7", borderTopRightRadius: 25, borderTopLeftRadius: 25}}>
                    <View style={{paddingTop: 25}}>
                        <Text style={{paddingTop: 18, marginLeft: 15, fontSize: 20, fontWeight: "800"}}>Trier par type de formations</Text>
                        <Close 
                            func={props.setVisibleModal}
                            padding={16}
                        />
                    </View>
                    {props.flatlist}
                </View>
             </View>
        </View> 
    </Modal>
    )
    return modal
}

export default ModalFilter