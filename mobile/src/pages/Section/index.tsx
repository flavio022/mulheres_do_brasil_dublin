import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import api from "../../services/api";
import Header from "../../components/Header";
import filter from "lodash.filter";

import {
  Container,
  Text,
  SectionItem,
  ImageSelection,
  ViewScroll,
  TextSession,
  SectionList,
  ContentHeader,
  TextName,
  ButtonDetails
} from "./styles";

interface IParams {
  organization_id: number;
}
interface ISearch {
  search: string;
}
export interface ISectionItems {
  id: string;
  name: string;
  tel: string;
  email: string;
  value: string;
  description: string;
  image_url: string;
}
export interface IOrganizationItems {
  name: string;
}
const Section: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [section, SetSection] = useState([]);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  function handleSubmit() {
    navigation.navigate("Details", {});
  }
  function handlernavigateBack() {
    navigation.goBack();
  }

  const route = useRoute();
  const routeParams = route.params as IParams;

  useEffect(() => {
    api.get(`sessionLocale/${routeParams.organization_id}`).then(response => {
      SetSection(response.data);
      setData(response.data);
    });
  }, []);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(data, user => {
      return contains(user, formattedQuery);
    });
    SetSection(filteredData);
    setQuery(text);
  };
  const contains = ({ name }: ISectionItems, query) => {
    if (name.toLowerCase().startsWith(query.toLowerCase())) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <Header>
        <ContentHeader>
          <AntDesign
            name="left"
            size={24}
            color="#fff"
            onPress={handlernavigateBack}
          />
        </ContentHeader>
      </Header>
      <SearchBar
        onChangeText={queryText => handleSearch(queryText)}
        value={query}
        placeholder="Type Here..."
      />
      <ViewScroll>
        <SectionList
          data={section}
          renderItem={({ item: section }) => (
            <SectionItem onPress={handleSubmit}>
              <ImageSelection source={{ uri: section.image_url }} />
              <TextSession>
                <TextName>{section.name}</TextName>
                <Text>Telefone: {section.tel}</Text>
                <Text>Email: {section.email}</Text>
                <Text>Valor: {section.value}</Text>
                <ButtonDetails>
                  <Text>Detalhes</Text>
                </ButtonDetails>
              </TextSession>
            </SectionItem>
          )}
        />
      </ViewScroll>
    </Container>
  );
};

export default Section;
