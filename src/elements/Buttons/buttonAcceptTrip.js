import React from "react";
import Button from "./button";
import useAcceptTrip from "./../../hooks/useAcceptTrip";

const ButtonAcceptTrip = ({ tripId }) => {
  const { acceptTrip } = useAcceptTrip();

  const handleAccept = () => {
    if (!tripId) {
      console.error("Error: tripId es undefined. No se puede aceptar la tarifa.");
      return;
    }
    acceptTrip(tripId);
  };

  return (
    <Button type="success" onPress={handleAccept} icon="check" loading={false}>
      Aceptar Tarifa
    </Button>
  );
};



export default ButtonAcceptTrip;



