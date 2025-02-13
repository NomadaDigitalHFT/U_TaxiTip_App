import React from "react";
import { ActivityIndicator } from "react-native"; // ✅ Se agregó importación
import useCancelRequest from "./../../hooks/useCancelRequest";
import Button from "./button";
import theme from "./../../styles/theme"; // ✅ Se agregó importación

const ButtonCancelCards = ({ userCardsId, screenName }) => {
  const { cancelRequest, loading } = useCancelRequest();

  return (
    <Button
      onPress={!loading ? () => cancelRequest(userCardsId, screenName) : null}
      disabled={loading}
      type="danger" // ✅ Se agregó el tipo "danger" para que el botón sea rojo
      loading={loading}
    >
      Cancelar
    </Button>
  );
};

export default ButtonCancelCards;





