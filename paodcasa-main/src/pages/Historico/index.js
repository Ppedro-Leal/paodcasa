import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

let clienteId = "655f752cea59669b9499eaa4";

export default function Historico() {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.8:3000/api/pedido/${clienteId}`)
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error("Erro na busca de pedidos:", error));
  }, [clienteId]);

  const pedidosAtuais = pedidos.slice(0, 2); // Exibe no máximo dois pedidos
  const historicoPedidos = pedidos.slice(2);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.cabeca}>
          <Text style={styles.cabecaTexto}>PEDIDOS</Text>
        </View>

        <ScrollView>
          <View>
            <View>
              <Text style={styles.nomepedidos}> Seus Pedidos </Text>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              {pedidosAtuais.map((pedido) => (
                <View key={pedido.id} style={styles.cardContainer}>
                  <TouchableOpacity style={styles.caixadepedidos}>
                    <View>
                      <View>
                        <Text style={styles.btn1}>
                          Código: {pedido.id.substring(0, 6)}
                        </Text>
                      </View>

                      {pedido.itens.map((item) => (
                        <View key={item.produto_id}>
                          <Text style={styles.btn2}>
                            Item: {item.quantidade}x {item.produto.nome}
                          </Text>
                        </View>
                      ))}

                      <View style={styles.setah}>
                        <View>
                          <Icon
                            name="chevron-down-sharp"
                            size={20}
                            color="#000"
                          />
                        </View>
                        <View>
                          <Text style={styles.btnh}>ACOMPANHAR</Text>
                        </View>
                      </View>


                      <View>
                        <Text style={styles.btn4}>Status: {pedido.status}</Text>
                      </View>

                      <View>
                        <Text style={styles.preco}>R$ {pedido.total}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View>
            <View>
              <Text style={styles.nomepedidos}> HISTÓRICO </Text>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              {historicoPedidos.map((historicoPedido) => (
                <TouchableOpacity
                  key={historicoPedido.id}
                  style={styles.cardContainer}
                >
                  <View style={styles.caixadehistoico}>
                    <View>
                      <View>
                        <Text style={styles.btn1}>
                          Cód. Pedido: {historicoPedido.id.substring(0, 6)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.btn2}>
                          Items: {historicoPedido.itens.length} itens
                        </Text>
                      </View>
                      <View>
                        <View style={styles.setah}>
                          <View>
                            <Icon
                              name="chevron-down-sharp"
                              size={20}
                              color="#000"
                            />
                          </View>
                          <View>
                            <Text style={styles.btnh}>ACOMPANHAR</Text>
                          </View>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.btn4}>FINALIZADO</Text>
                      </View>

                      <View>
                        <Text style={styles.preco}>
                          R$ {historicoPedido.total}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate("Carrinho")}
          style={styles.buttonContainer}
        >
          <View style={styles.button}>
            <View>
              <Icon name="basket" size={40} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCBCB4",
  },

  cabeca: {
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 90,
  },
  cabecaTexto: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    top: 10,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  nomepedidos: {
    marginLeft: 40,
    color: "#5A4429",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "700",
    marginBottom: 20,
  },

  cardContainer: {
    marginBottom: 16,
    marginHorizontal: 3,
  },

  caixadepedidos: {
    width: "98%",
    height: 150,
    backgroundColor: "#DCCCAC",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
  },

  btn1: {
    marginRight: 100,
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: 15,
  },
  btn2: {
    marginRight: 110,
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: 30,
  },
  btn3: {
    marginLeft: 25,
    color: "#5A4429",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
    top: 80,
  },
  btnh: {
    marginLeft: 10,
    color: "#5A4429",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "700",
  },
  btn4: {
    marginLeft: 200,
    color: "#5A4429",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
    top: -80,
  },
  preco: {
    marginLeft: 200,
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    top: -30,
  },

  caixadehistoico: {
    width: "98%",
    height: 150,
    backgroundColor: "#DCCCAC",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 40,
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    marginLeft: 280,
    top: -10,
  },
  setah: {
    alignItems: "center",
    flexDirection: "row",
    top: 60,
  },

  setap: {
    top: 60,
  },
});
