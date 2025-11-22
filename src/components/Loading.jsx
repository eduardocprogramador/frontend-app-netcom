import { ActivityIndicator, View } from 'react-native'
import bs from '../../library/bootstrap'
import Title from './Title'

const Loading = () => {
    return (
        <View style={bs('container', 'center')}>
            <ActivityIndicator size="large" style={bs('mb-1')} />
            <Title>Carregando...</Title>
        </View>
    )
}

export default Loading