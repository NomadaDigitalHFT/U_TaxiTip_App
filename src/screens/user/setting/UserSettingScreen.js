import React from "react";
import { View } from "react-native";
import { 
  Container, 
  ProfileImage, 
  UserInfo 
} from "./../../../styles/StyleSetting/StyleSettingUser";

import UserFooter from "./../../../components/common/UserFooter"; // 

const UserSettingScreen = () => {
  return (
    <Container>
      <View style={{ alignItems: "center", gap: 15 }}>
        {/* Imagen de perfil */}
        <ProfileImage source={{ uri: "https://via.placeholder.com/150" }} />

        {/* Información del usuario */}
        <UserInfo>Nombre: Juan Pérez</UserInfo>
        <UserInfo>Email: juanperez@example.com</UserInfo>
        <UserInfo>Teléfono: +123 456 789</UserInfo>
      </View>
      
      {/* Footer del usuario */}
      <UserFooter /> 
    </Container>
  );
};

export default UserSettingScreen;




