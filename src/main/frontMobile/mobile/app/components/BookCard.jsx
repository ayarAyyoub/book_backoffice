import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 
var width = Dimensions.get('window').width;   
export default ({ book , detailsButton : DetailsButton}) => {
    const navigation = useNavigation();
    
    return (
        <View  style={styles.container}>
            <View style={styles.container_shadow}>
                <View> 
                    <Image style={styles.image} source={{ uri: book.photo.link }} />
                </View>
                <View>
                        <TouchableOpacity onPress={
                            () => navigation.navigate('book-detail', {
                                bookId: book.book_id
                              })
                            }  style={styles.text_container}>
                            <View style={styles.book_desc} > 
                                <Text  style={styles.booktitle}>{book.title}</Text> 
                                <Text style={styles.writtenTag}>Written by :</Text>
                                <Text  style={styles.bookAuthor}>
                                    {book.author.first_name + ' '+ book.author.last_name }
                                </Text> 
                            </View> 
                        </TouchableOpacity> 
                </View>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding : 10
    },
    container_shadow:{
        width: width -20,
        height: 150,
        borderRadius : 10,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
    },
    image :{
        width: width -20,
        height: 150,
        borderRadius : 10
    },
    text_container:{
        position: "absolute",
        width: width -20,
        height: 30,
        bottom:0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius: 10,
      
      },
      book_desc : {
        flexDirection:'row', 
        alignItems:'center'
      },
      booktitle: {
        color: "white",
        fontSize : 20,
        marginBottom: 10
      },
      writtenTag : {
        marginLeft: 'auto', 
        marginVertical:10,
        color: "white",
        fontSize : 10
      },
      bookAuthor : { 
        justifyContent:'space-evenly',
        marginVertical:10,
        marginRight : 10,
        marginLeft:5,
        color: "white",
        fontSize : 12,
        fontWeight: 'bold'
      }
})
