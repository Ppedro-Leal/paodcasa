import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Historico() {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState([]);
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

  async function getPedidos() {
    fetch(`http://192.168.0.107:3000/api/pedido/${clienteId}`)
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error("Erro na busca de pedidos:", error));
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente pedido montado");
          await get();
          if (clienteId !== undefined) {
            await getPedidos();
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();

      return () => {};
    }, [clienteId])
  );

  const pedidosAtuais = pedidos.slice(0, 2); // Exibe no máximo dois pedidos
  const historicoPedidos = pedidos.slice(2);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.cabeca}>
          <Text style={styles.cabecaTexto}>PEDIDOS</Text>
        </View>

        <ScrollView style={styles.scroll}>
          <View style={styles.tudo}>
            <View>
              <Text style={styles.nomepedidos}> Seus Pedidos </Text>
            </View>

            <View style={{ marginHorizontal: width * 0.05 }}>
              {pedidosAtuais.map((pedido) => (
                <TouchableOpacity
                  key={pedido.id}
                  style={styles.caixadepedidos}
                  onPress={() =>
                    navigation.navigate("DetalhesPedido", { pedido })
                  }
                >
                  <View>
                    <View>
                      <Text style={styles.cdgpedido}>
                        Código: {pedido.id.substring(0, 6)}
                      </Text>
                    </View>

                    {pedido.itens.map((item) => (
                      <View key={item.produto_id}>
                        <Text style={styles.itens}>
                          Item: {item.quantidade}x {item.produto.nome}
                        </Text>
                      </View>
                    ))}

                    <View style={styles.setah}>
                      <View>
                        <Icon
                          name="chevron-down-sharp"
                          size={width * 0.04}
                          color="#000"
                        />
                      </View>
                      <View>
                        <Text style={styles.btn}>ACOMPANHAR</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "column" }}>
                      <View>
                        <Text style={styles.statspedidos}>
                          Status: {pedido.status}
                        </Text>
                      </View>

                      <View>
                        <Text style={styles.preco}>R$ {pedido.total}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.tudo}>
            <View>
              <Text style={styles.nomehistorico}> HISTÓRICO </Text>
            </View>

            <View style={{ marginHorizontal: width * 0.05 }}>
              {historicoPedidos.map((historicoPedido) => (
                <TouchableOpacity
                  key={historicoPedido.id}
                  style={styles.caixadepedidos}
                  onPress={() =>
                    navigation.navigate("DetalhesPedido", { historicoPedido })
                  }
                >
                  <View>
                    <View>
                      <Text style={styles.cdgpedido}>
                        Cód. Pedido: {historicoPedido.id.substring(0, 6)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.itens}>
                        Items: {historicoPedido.itens.length} itens
                      </Text>
                    </View>
                    <View style={styles.setah}>
                      <View>
                        <Icon
                          name="chevron-down-sharp"
                          size={width * 0.04}
                          color="#000"
                        />
                      </View>
                      <View>
                        <Text style={styles.btnhistorico}>ACOMPANHAR</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.statshistorico}>FINALIZADO</Text>
                    </View>

                    <View>
                      <Text style={styles.precohist}>
                        R$ {historicoPedido.total}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Carrinho")}
            style={styles.buttonContainer}
          >
            <View style={styles.button}>
              <View>
                <Icon name="basket" size={width * 0.1} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCBCB4",
    marginBottom: 1,
  },

  cabeca: {
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.1,
  },
  cabecaTexto: {
    color: "white",
    fontSize: width * 0.06,
    fontWeight: "bold",
    top: height * 0.01,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: width * 0.01, height: height * 0.003 },
    textShadowRadius: width * 0.02,
  },

  scroll: {
    width: "100%",
  },

  tudo: {
    display: "flex",
    flexDirection: "column",
  },

  nomepedidos: {
    color: "#5A4429",
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginLeft: width * 0.09,
  },
  nomehistorico: {
    color: "#5A4429",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginLeft: width * 0.09,
    marginTop: width * 0.29,
  },

  caixadepedidos: {
    marginBottom: width * 0.01,
    width: "100%",
    height: 150,
    backgroundColor: "#DCCCAC",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
    marginVertical: 10,
  },

  setah: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  cdgpedido: {
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: height * 0.02,
  },
  itens: {
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: height * 0.03,
  },

  btn: {
    top: width * 0.14,
    color: "#5A4429",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
  },

  statspedidos: {
    marginLeft: height * 0.25,
    color: "#5A4429",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
    top: height * -0.1,
  },
  preco: {
    marginLeft: width * 0.6,
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: height * -0.06,
  },

  caixadehistoico: {
    width: 350,
    height: 150,
    backgroundColor: "#DCCCAC",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
    marginLeft: 15,
  },

  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    marginLeft: 280,
    top: -10,
  },

  statshistorico: {
    marginLeft: height * 0.25,
    color: "#5A4429",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
    top: height * -0.05,
  },

  btnhistorico: {
    top: width * 0.2,
    color: "#5A4429",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
  },

  precohist: {
    marginLeft: width * 0.6,
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: height * 0.02,
  },
});
