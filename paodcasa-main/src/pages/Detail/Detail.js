import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Counter from "../../Components/Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail() {
  const { params } = useRoute();
  let produto = params;

  const navigation = useNavigation();

  const [produtos, setProdutos] = useState([]);

  const [count, setCount] = useState(1);

  const [totalPrice, setTotalPrice] = useState(
    produto.preco ? produto.preco * count : 0
  );

  const [decodedToken, setDecodedToken] = useState(null);
  const [clienteId, setClienteId] = useState();

  async function get() {
    const userToken = await AsyncStorage.getItem("userToken");

    if (userToken) {
      const decoded = jwtDecode(userToken);

      setClienteId(decoded.clienteId);
      setDecodedToken(decoded);
    } else {
      console.log("Token não encontrado no AsyncStorage");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente item selecionado montado");
          await get();
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
      return () => {};
    }, [])
  );

  function getProduto() {
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
      });
  }

  useEffect(() => {
    getProduto();
  }, []);

  const AdicionarCarrinho = async () => {

    if(!clienteId){
      return  Alert.alert('Entre em uma conta para adicionar itens à sacola.')
    }

    try {
      const response = await fetch(
        `http://192.168.0.107:3000/api/carrinho/cliente/${clienteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produtoId: produto.id,
            quantidade: count,
            preco: totalPrice.toFixed(2)
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao adicionar produto à sacola");
      }

      alert("Produto adicionado à sacola com sucesso!");
      navigation.navigate("Carrinho");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  function handleNavigateToInicio() {
    // Navegar para a rota BottomTabNavigator
    navigation.navigate("BottomTabNavigator", { screen: "Inicio" });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="transparent" />

      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: `http://192.168.0.107:3000${produto.imagem[0].url}` }}
          style={styles.imgProduto}
        />
        <TouchableOpacity
          onPress={handleNavigateToInicio}
          style={styles.btnBack}
        >
          <Image
            source={require("../../../assets/arrow-left.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nameSpace}>
        <Text style={styles.nameProduto}> {produto.nome}</Text>
        <Text style={[styles.nameProdutoPrice, { paddingRight: 18 }]}>
          {" "}
          R$ {produto.preco}/Unid
        </Text>
      </View>

      <View style={styles.descricaoSpace}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            color: "#5A4429",
            paddingTop: 8,
          }}
        >
          Descrição
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontWeight: "500",
            color: "#5A4429",
            fontSize: 13,
          }}
        >
          {produto.descricao}
        </Text>
      </View>

      <View style={{ marginTop: 16, alignItems: "center", marginBottom: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#5A4429" }}>
          Mais Itens
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", marginTop: 19 }}>
            {produtos.map((produto, index) => (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ItemSelecionado", { ...produto })
                  }
                  style={{
                    alignItems: "center",
                    paddingLeft: 12,
                    marginBottom: 6,
                  }}
                >
                  <Image
                    source={{
                      uri: `http://192.168.0.107:3000${produto.imagem[0].url}`,
                    }}
                    style={styles.imgProdutos}
                  />
                  <Text
                    style={{
                      color: "#5A4429",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {produto.nome}
                  </Text>
                  <Text
                    style={{
                      color: "#5A4429",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {produto.preco}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: "#b48c5c73",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
      >
        <Text style={{ color: "#CCBCB4" }}>.</Text>
        <View
          style={{
            marginTop: -13,
            backgroundColor: "#DCCCAC",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 8,
              marginTop: 20,
              paddingLeft: 8,
              borderBottomColor: "#848484",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: "#5A4429",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 0.45,
              }}
            >
              Quantidade
            </Text>
            <Counter
              count={count}
              setCount={setCount}
              setTotalPrice={setTotalPrice}
              produto={produto}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 8,
              marginTop: 9,
              paddingLeft: 8,
            }}
          >
            <Text
              style={{
                color: "#5A4429",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 0.45,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                color: "#5A4429",
                fontSize: 18,
                paddingRight: 20,
                fontWeight: "bold",
              }}
            >
              {totalPrice.toFixed(2)}
            </Text>
          </View>
          <View style={{ height: "100%", width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AdicionarCarrinho();
                } catch (error) {
                  console.error("Erro ao adicionar produto à sacola:", error);
                  Alert.alert('Entre em uma conta para adicionar itens à sacola.')
                }
              }}
              style={{
                backgroundColor: "#67452C",
                width: "90%",
                height: 46,
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                borderRadius: 25,
              }}
            >
              <Text
                style={{
                  paddingTop: 12,
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Adicionar a sacola
              </Text>
              <Image
                source={require("../../../assets/sacola.png")}
                style={{ width: 20, height: 20, marginTop: 12, marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCBCB4",
  },
  imgProduto: {
    width: "100%",
    height: 300,
  },
  btnBack: {
    position: "absolute",
    marginTop: 56,
    marginLeft: 16,
    backgroundColor: "#CCBCB4",
    padding: 8,
    borderRadius: 9999,
    elevation: 3,
  },
  nameSpace: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 24,
    marginTop: -38,
    backgroundColor: "#CCBCB4",
    borderBottomColor: "#848484",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameProduto: {
    fontSize: 25,
    paddingLeft: 20,
    paddingBottom: 15,
    lineHeight: 36,
    fontWeight: "600",
    color: "#5A4429",
  },
  nameProdutoPrice: {
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 15,
    lineHeight: 36,
    fontWeight: "600",
    color: "#5A4429",
  },
  descricaoSpace: {
    marginTop: 8,
    paddingLeft: 20,
  },
  imgProdutos: {
    width: 73,
    height: 73,
    borderRadius: 5,
  },
});
