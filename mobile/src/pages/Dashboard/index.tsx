import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import {
  Container,
  HeaderTittle,
  ImageLogo,
  Content,
  TabsContainer,
  TabsContent,
  TabsItem,
  Text,
  ImageSelection,
  ButtonDetails,
  SectionList,
  TextButton
} from "./styles";

export interface IOrganizationItems {
  id: number;
  name: string;
  image_url: string;
}
const Dashboard: React.FC = () => {
  const [organization, SetOrganization] = useState([]);

  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate("Section", {});
  }

  function handlerNavigationToSection(id: number) {
    navigation.navigate("Section", { organization_id: id });
  }
  useEffect(() => {
    api.get("organization").then(response => {
      SetOrganization(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <ImageLogo source={logo} />
        <HeaderTittle>Mulheres do Brasil Dublin</HeaderTittle>
      </Header>
      <Content>
        <TabsContainer>
          <TabsContent>
            <SectionList
              horizontal
              data={organization}
              renderItem={({ item: organization }) => (
                <TabsItem
                  onPress={() => handlerNavigationToSection(organization.id)}
                >
                  <ImageSelection source={{ uri: organization.image_url }} />
                  <Text>{organization.name}</Text>
                  <ButtonDetails>
                    <TextButton>Saiba mais</TextButton>
                  </ButtonDetails>
                </TabsItem>
              )}
            />
          </TabsContent>
        </TabsContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
