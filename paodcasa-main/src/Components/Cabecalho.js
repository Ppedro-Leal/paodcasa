import React from 'react';
import { View, Image, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';


export default function Cabecalho(){


    return (
        <View style={styles.cabeca}>
          <StatusBar style='dark-content'/>
          <Text style={styles.cabecaTexto}>Padaria {" "}
        <Image
          source={require('../../assets/padaria.png')}
          style={{ height: 25,
            width: 25,}}
        />{" "} PãoD'Casa</Text></View>
          
         
        
      );
    };
    


    const styles = StyleSheet.create({
      cabeca: {
        backgroundColor: '#67452C',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        height: 60
      },
      cabecaTexto: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        
      },
     
    });