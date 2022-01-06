import {  useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { View, Text, Button, Image, Dimensions, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';


var width = Dimensions.get('window').width;   

export default ()=> {
   const {books } = useSelector(state => state.books);
 
  
   const route= useRoute();
   const { bookId } = route.params; 

   const book = books.filter(b => b.book_id === bookId)[0];

  
   if(book === undefined || book === null) return <View><Text>Not found</Text></View>

    return (
        <View>
            <View  style={styles.container}>
                <View style={styles.container_shadow}>
                    <View> 
                        <Image style={styles.image} source={{ uri: book.photo.link }} />
                    </View>
                    <View>
                        <View onPress={
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
                        </View> 
                    </View>
                </View> 
            </View>
            <View style={styles.desc_container}>
                <View style={styles.section}>
                    <Text style={styles.section_title}>Author</Text>
                </View>
                <View style={styles.line_text}>
                    <Text style={styles.label} >Birth date : </Text>
                    <Text>{book.author.birth_date}</Text>
                </View> 

                <View style={styles.section}>
                    <Text style={styles.section_title}>Book Info</Text>
                </View>
                <View style={styles.line_text}>
                    <Text style={styles.label} >Total pages : </Text>
                    <Text>{book.total_pages}</Text>
                </View>
                <View style={styles.line_text}>
                    <Text style={styles.label} >Publish date : </Text>
                    <Text>{book.published_date}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.section_title}>Categories</Text>
                </View>
                {
                    book.categories.map(cat=> <View key={`category-book-${cat.id}`}> 
                        <Text>{cat.name}</Text>
                    </View>)
                }
                
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
        height: 250,
        borderRadius : 10,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
    },
    image :{
        width: width -20,
        height: 250,
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
      },
      desc_container : {
        padding : 30,
        width: width -20,
        borderRadius : 10,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
      },
      section : {
        padding:5,
        margin : 2,  
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 1
        }
      },
      line_text : {
        flexDirection:'row',
        height: 30
      },
      label : {
        fontWeight:'bold',
        letterSpacing:1.2,
      },
      section_title : {
        color: "#EA5C2B",
        fontWeight : "bold",
        letterSpacing:1.5,
        fontSize : 20
      }
})
