import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

export default function TestScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
    // useEffect(() => {
    //    fetch('') 
    // },[])
  useEffect(() => {
    fetch('http://192.168.3.22/res/movies.json')
    // fetch('http://192.168.3.22/utills/sql.js')
      .then(response => response.json())
      .then(json => setData(json.movies))
      .catch(error => console.error(error))
          .finally(() => setLoading(false));
      
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
}
