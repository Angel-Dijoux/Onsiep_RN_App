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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <View>
                <View style={{maxWidth:"85%", minWidth: "80%",maxHeight: "80%", minHeight:"55%", backgroundColor:"#F7F7F7", borderRadius: 8}}>
                    
                    <View style={{flexDirection:"row", justifyContent: "space-between", alignItems: 'center',backgroundColor:"#1D7C91", padding:15, borderTopLeftRadius: 8, borderTopRightRadius: 8}}> 
                        <Text style={{color: "#F7F7F7"}}>Trier par type de formations</Text>
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