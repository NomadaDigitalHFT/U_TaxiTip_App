import React from "react";
import { ActivityIndicator } from "react-native";
import useCancelRequest from "./../../hooks/useCancelRequest";
import Button from "./button";
import theme from "./../../styles/theme";

const ButtonCancelCards = ({ userCardsId, screenName }) => {
  const { cancelRequest, loading } = useCancelRequest();

  return (
    <Button
      onPress={!loading ? () => cancelRequest(userCardsId, screenName) : null}
      disabled={loading}
      type="danger"
      loading={loading}
    >
      Cancelar
    </Button>
  );
};

export default ButtonCancelCards;





