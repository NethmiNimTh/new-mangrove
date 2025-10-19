//import libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// component
const CitizenDashboard = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleCategoryPress = (category) => {
        navigation.navigate('ObservationForm', { category });
    };

    const handleNavigation = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Icon name="arrow-back" size={28} color="#4A7856" />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Please Upload Your</Text>
                    <Text style={styles.title}>Observations</Text>
                </View>

                {/* Category Grid */}
                <View style={styles.gridContainer}>
                    {/* Plants Card */}
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => navigation.navigate('PlantDataCollection', { category: 'Plants' })}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/image/Plant.jpg')}
                            style={styles.cardImage}
                            imageStyle={styles.cardImageStyle}
                        >
                            <View style={styles.cardOverlay}>
                                <Text style={styles.cardText}>Plants</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Nature Card */}
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => navigation.navigate('NatureDataCollection', { category: 'Nature' })}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/image/Nature.jpg')}
                            style={styles.cardImage}
                            imageStyle={styles.cardImageStyle}
                        >
                            <View style={styles.cardOverlay}>
                                <Text style={styles.cardText}>Nature</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Animals Card */}
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => navigation.navigate('AnimalDataCollection', { category: 'Animals' })}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/image/Animal.jpg')}
                            style={styles.cardImage}
                            imageStyle={styles.cardImageStyle}
                        >
                            <View style={styles.cardOverlay}>
                                <Text style={styles.cardText}>Animals</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Human Activity Card */}
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => navigation.navigate('HumanActivityDataCollection', { category: 'Human Activity' })}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/image/HumanActivity.jpeg')}
                            style={styles.cardImage}
                            imageStyle={styles.cardImageStyle}
                        >
                            <View style={styles.cardOverlay}>
                                <Text style={styles.cardText}>Human Activity</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={() => handleNavigation('Home')}
                        activeOpacity={0.7}
                    >
                        <Icon name="home" size={28} color="#666" />
                        <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={() => handleNavigation('Feed')}
                        activeOpacity={0.7}
                    >
                        <Icon name="wb-sunny" size={28} color="#666" />
                        <Text style={styles.navText}>Feed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={() => handleNavigation('Explore')}
                        activeOpacity={0.7}
                    >
                        <Icon name="search" size={28} color="#666" />
                        <Text style={styles.navText}>Explore</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={() => handleNavigation('Highlights')}
                        activeOpacity={0.7}
                    >
                        <Icon name="account-circle" size={28} color="#666" />
                        <Text style={styles.navText}>Highlights</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontFamily: 'JejuHallasan-Regular',
        color: '#4A7856',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },
    card: {
        width: '47%',
        height: 180,
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    cardImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    cardImageStyle: {
        borderRadius: 15,
    },
    cardOverlay: {
        backgroundColor: 'rgba(74, 120, 86, 0.85)',
        paddingVertical: 12,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 20,
        fontFamily: 'JejuHallasan-Regular',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        fontFamily: 'JejuHallasan-Regular',
    },
});

export default CitizenDashboard;