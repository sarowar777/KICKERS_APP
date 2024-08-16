import { View, Text } from 'react-native'
import React from 'react'
import OpponentList from './OpponentList'
import { MATCH, TOP_GAME } from '../data/constList'
import MatchList from './MatchList'

export default function Match() {
  return (
    <View style={{flex:1,backgroundColor:'#E6E6E6'}}>
        <MatchList  list={MATCH} />
    </View>
  
  )
}