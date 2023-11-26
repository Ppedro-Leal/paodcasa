import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Cabecalho from "../../Components/Cabecalho";
import Carousel from "../../Components/Carousel";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Home() {

  const [produtos, setProdutos] = useState([])

  const navigation = useNavigation();

  function test() {
    fetch("http://192.168.0.107:3000/api/produto")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação GET");
        }
        return response.json();
      })
      .then((data) => {
        setProdutos(data);

      })
      .catch((error) => {
        console.error("Erro:", error);
      })
  };

  useEffect(() => {
    test()
  }, [])



  return (

    <View style={styles.container}>
     
        
          <StatusBar style="auto" backgroundColor="#67452C" />
          <Cabecalho />
          <Text style={styles.txtEndereco}>Endereço: R. Xavier Sobrinho</Text>
          
            <Carousel />
          
            
            <Text style={styles.txtMaisVendidos}>Mais Vendidos</Text>
      
            <ScrollView  showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 25, }}>
                {produtos.map((produto, index) => (
                  <View key={index} style={styles.itemContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate('ItemSelecionado', { ...produto })}
                      style={{ alignItems: 'center', paddingHorizontal: 55,  paddingVertical: 15 }}>
                      <Image source={{ uri: `http://192.168.0.107:3000${produto.imagem[0].url}` }} style={styles.imgProdutos}
                      />
                      <Text style={{ color: '#5A4429', fontSize: 15, fontWeight: 'bold' }}>{produto.nome}</Text>
                      <Text style={{ color: '#5A4429', fontSize: 15, fontWeight: 'bold' }}>{produto.preco}/unid</Text>
                    </TouchableOpacity>

                  </View>
                ))}


              </View>

              
            
            </ScrollView>
            <TouchableOpacity
          style={styles.botaoCarrinho}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Image
          source={require('../../../assets/sacola.png')}
          style={{width:35,height:35,}} />
        </TouchableOpacity>

        

         
        
      

    </View>




  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 28,
    backgroundColor: '#CCBCB4',

  },
  txtEndereco: {
    marginTop: 15,
    marginLeft: 41,
    marginBottom:11,
    color: '#5A4429',
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700"
  },
  txtMaisVendidos: {
    marginTop: 15,
    fontSize: 32,
    textAlign: 'center',
    color: '#5A4429',
    fontStyle: "normal",
    fontWeight: '700'
  },
  imgProdutos: {
    width: 83,
    height: 83,
    borderRadius: 5
  },
  botaoCarrinho: {
    backgroundColor: '#67452C',
    padding: 10,
    borderRadius: 9999,
    position: 'absolute',
    bottom: 67,
    right: 20,
    width:60,
    height:60,
    alignItems:'center',
    elevation:3
  },
});
