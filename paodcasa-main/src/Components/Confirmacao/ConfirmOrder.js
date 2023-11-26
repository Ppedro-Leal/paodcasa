import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function ConfirmOrder({ route }) {
  const navigation = useNavigation();
  const { carrinhoProdutos } = route.params;

  const [endereco, setEndereco] = useState();
  const [cliente, setCliente] = useState();

  const getCarrinho = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.107:3000/api/endereco/${carrinhoProdutos[0].carrinho_id}`
      );
      if (!response.ok) {
        throw new Error("Erro ao recuperar produtos no carrinho");
      }

      const data = await response.json();
      setEndereco(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCliente = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.107:3000/api/cliente/${carrinhoProdutos[0].carrinho_id}`
      );
      if (!response.ok) {
        throw new Error("Erro ao recuperar produtos no carrinho");
      }

      const data = await response.json();
      setCliente(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCarrinho();
    getCliente();
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.pageNameSpace}>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Image
            source={require("../../../assets/arrow-left2.png")}
            style={{ width: 38, height: 26, marginLeft: 15, marginTop: 5 }}
          />
        </TouchableOpacity>

        <Text style={styles.pageName}>Confirmar Pedido</Text>
      </View>

      <View style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#848484" }}>
          <Text style={styles.nameCardInf}>Informações de entrega</Text>
        </View>
        <View style={{ marginTop: 6, marginLeft: 22, flexDirection: "row" }}>
          <Text style={styles.upPartInf}>{cliente?.nome}</Text>
          <Text style={[styles.upPartInf, { marginLeft: 10 }]}>
            Número: {cliente?.telefone}
          </Text>
        </View>
        {endereco?.map((endereco) => (
          <View >
            <Text style={[styles.downPartInf, {marginTop: 10}]}>{endereco.rua}</Text>
            <Text style={styles.downPartInf}>{endereco.cidade}, {endereco.estado} </Text>
            <Text style={[styles.downPartInf, { marginBottom: 13}]}>{endereco.cep}</Text>
          </View >
        ))}
      </View>
      <View style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#848484" }}>
          <Text style={styles.nameCardInf}>Itens de entrega</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {carrinhoProdutos?.map((produto, index) => (
            <View style={{ marginLeft: 13, alignItems: 'flex-start', marginTop: 6 }} key={index}>
               <View style={{ alignItems: 'center' }}>
              <Image
                source={{
                  uri: `http://192.168.0.107:3000${produto.produto.url}`,
                }}
                style={{
                  width: 77,
                  height: 77,
                  borderRadius: 5,
                  marginTop: 12
                }}
              />
              <Text
                style={{
                  color: "#5A4429",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 2,
                  textAlign: "center",
                  maxWidth: 100,
                }}
              >
                {produto.produto.nome}
              </Text>
              <View
                style={{ flexDirection: "row", marginBottom: 13, marginTop: 5 }}>
                <Text
                  style={{ color: "#5A4429", fontSize: 14, fontWeight: "bold" }}
                >
                  {"Quantidade: "}
                  {produto.quantidade}{" "}
                </Text>
              </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#848484" }}>
          <Text style={styles.nameCardInf}>Forma de pagamento</Text>
        </View>
        <Text style={styles.txtFormPay}>+ Selecione a forma de pagamento</Text>
      </View>

      <View style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}>
        <View
          style={{
            marginTop: 12,
            paddingBottom: 12,
            justifyContent: "space-between",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#848484",
          }}
        >
          <Text
            style={{
              marginLeft: 22,
              color: "#5A4429",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 0.45,
            }}
          >
            Frete
          </Text>
          <Text
            style={{
              marginRight: 22,
              color: "#5A4429",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 0.45,
            }}
          >
            1,00
          </Text>
        </View>
        <View
          style={{
            marginTop: 12,
            marginBottom: 12,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              marginLeft: 21,
              color: "#5A4429",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 0.45,
            }}
          >
            Tempo estimado
          </Text>
          <Text
            style={{
              marginRight: 18,
              color: "#5A4429",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 0.45,
            }}
          >
            17:38
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 12 }}>
        <Text
          style={{
            marginLeft: 15,
            color: "#5A4429",
            fontSize: 13,
            fontWeight: "bold",
            letterSpacing: 0.45,
          }}
        >
          Ao clicar em "Fazer pedido" você está{"\n"}
          concordando com os nossos{" "}
          <Text style={{ color: "#C0883E", fontWeight: "bold" }}>
            termos e condições
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#b48c5c73",
          marginTop: 12,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Text style={{color:'#b48c5c73'}}>.</Text>
        <View
          style={{
            backgroundColor: "#DCCCAC",
            marginTop: -14,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                paddingLeft: 27,
                fontSize: 15,
                color: "#5A4429",
                fontWeight: "bold",
              }}
            >
              Total
            </Text>
            <Text
              style={{
                paddingRight: 27,
                fontSize: 15,
                color: "#5A4429",
                fontWeight: "bold",
              }}
            >
              3,00
            </Text>
          </View>
          <View>
            <View
              style={{ height: "100%", width: "100%", alignItems: "center" }}
            >
              <TouchableOpacity style={styles.btnConfPedido}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingTop: 11,
                  }}
                >
                  FAZER PEDIDO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#CCBCB4",
    flex: 1,
  },
  pageNameSpace: {
    backgroundColor: "#67452C",
    height: 52,
    width: "100%",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    flexDirection: "row",
    elevation: 2,
  },
  pageName: {
    color: "#DCCCAC",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    marginLeft: 35,
    marginTop: 3,
    shadowColor: "#DCCCAC",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 7,
  },
  nameCardInf: {
    color: "#5A4429",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 22,
    marginBottom: 6,
    marginTop: 6,
  },
  upPartInf: {
    fontSize: 15,
    color: "#5A4429",
    fontWeight: "bold",
  },
  downPartInf: {
    marginLeft: 22,
    color: "#5A4429",
    fontSize: 14,
    fontWeight: "bold",
  },
  imgProduto: {
    width: 20,
    height: 20,
  },
  txtFormPay: {
    color: "#5A4429",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 22,
    marginBottom: 8,
  },
  btnConfPedido: {
    backgroundColor: "#67452C",
    width: "90%",
    height: 47,
    alignItems: "center",
    borderRadius: 25,
    marginTop: 14,
  },
  produtoSpace: {
    marginBottom: 16,
  },
});
