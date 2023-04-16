import { View, Text, Button } from 'react-native'
import React, {useState} from 'react'
import Modal from "react-native-modal";

const CoinModal = () => {
    const [showModal, setShowModal] = useState(false)
  return (
 
<View className = "">
<Modal isVisible={true}  onBackdropPress={() => setShowModal(false)}>
<View style={{ flex: 1 }}>
<Text>Hello!</Text>
<Text className = "text-white">this is nauman ajmal</Text>

<Button title="Hide modal" onPress={()=>{setShowModal(!showModal)}} />
</View>
</Modal>
</View>
  )
}

export default CoinModal