import React from 'react'
import { View, Button, TextInput, Text, FlatList, ActivityIndicator } from 'react-native'
import styles from '../Styles/StyleSearch.js'
import FilmsItems from './FilmsItems.js'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi.js'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadFilm() {
        this.setState({ films: null })
        this.setState({ isLoading: true })
        if(this.searchedText != "") 
        {

            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {this.setState({films: data.results, isLoading: false})}) 
        } else
        {
            this.setState({isLoading: false})
            alert('Veuillez rentrer un titre.');
        }

    }

    _searchTextInputChanged(text) 
    {
        this.searchedText = text
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render() {
        return(
            <View style={[ styles.main_container ]} >
                <TextInput onSubmitEditing={() => this._loadFilm()} onChangeText={(text) => this._searchTextInputChanged(text)} style={[ styles.textinput ]} placeholder="Titre du film"/>
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._loadFilm()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmsItems film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

export default Search;