import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import filmsStyle from '../Styles/filmsItems.js'
import { getImageFromApi } from '../API/TMDBApi.js'

class FilmsItems extends React.Component {
    render() {
        const film = this.props.film
        return (
        <View style={filmsStyle.main_container}>
            <Image
                style={filmsStyle.image}
                source={{uri: getImageFromApi(film.poster_path)}}
            />
            <View style={filmsStyle.content_container}>
            <View style={filmsStyle.header_container}>
                <Text style={filmsStyle.title_text}>{film.title}</Text>
                <Text style={filmsStyle.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={filmsStyle.description_container}>
                <Text style={filmsStyle.description_text} numberOfLines={6}>{film.overview}</Text>
            </View>
            <View style={filmsStyle.date_container}>
                <Text style={filmsStyle.date_text}>Sorti le {film.release_date}</Text>
            </View>
            </View>
      </View>
        );
    }
}

export default FilmsItems