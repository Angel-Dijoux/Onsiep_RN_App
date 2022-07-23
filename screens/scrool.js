import React from 'react';
import { FlatList } from 'react-native';

const VirtualizedView = props => {
  return (
    <FlatList
      {...props}
      data={[]}
      keyExtractor={(e, i) => 'dom' + i.toString()}
      ListEmptyComponent={null}
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListHeaderComponent={() => (
        <>{props.children}</>
      )}
      style={{
        backgroundColor: "#F7F7F7"
      }}
    />
  );
};

export default VirtualizedView;

//https://www.npmjs.com/package/recyclerlistview