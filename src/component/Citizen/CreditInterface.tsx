import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// component
const PhotoInformation = () => {
    const navigation = useNavigation();

    const [contactInfo, setContactInfo] = useState('');
    const [canUsePhoto, setCanUsePhoto] = useState('Yes');
    const [photoCredit, setPhotoCredit] = useState('');

    const handleSubmit = () => {
        const photoInformation = {
            contactInfo,
            canUsePhoto,
            photoCredit
        };
        console.log('Submit photo information:', photoInformation);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Photo Information</Text>
                </View>

                {/* Form Container */}
                <View style={styles.formContainer}>
                    {/* Photo Credits Information Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Photo Credits Information</Text>
                        
                        <Text style={styles.infoText}>
                            If you wish to know more about your uploaded photo, please leave your contact details.
                        </Text>

                        {/* Contact Information Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile number or email (optional)</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Your contact information"
                                placeholderTextColor="#CCC"
                                value={contactInfo}
                                onChangeText={setContactInfo}
                            />
                            <Text style={styles.helperText}>
                                This information will be shared with the admin.
                            </Text>
                        </View>

                        {/* Permission Section */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.questionText}>
                                Please indicate whether we can use this photo:
                            </Text>
                            
                            <View style={styles.radioGroup}>
                                <TouchableOpacity 
                                    style={styles.radioOption}
                                    onPress={() => setCanUsePhoto('Yes')}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.radioButton}>
                                        {canUsePhoto === 'Yes' && <View style={styles.radioButtonSelected} />}
                                    </View>
                                    <Text style={styles.radioLabel}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.radioOption}
                                    onPress={() => setCanUsePhoto('No')}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.radioButton}>
                                        {canUsePhoto === 'No' && <View style={styles.radioButtonSelected} />}
                                    </View>
                                    <Text style={styles.radioLabel}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Photo Credit Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Photo credit:</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="How should we credit this photo?"
                                placeholderTextColor="#CCC"
                                value={photoCredit}
                                onChangeText={setPhotoCredit}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity 
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    container: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'JejuHallasan-Regular',
        color: '#4A7856',
        fontWeight: 'bold',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        fontFamily: 'JejuHallasan-Regular',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
        fontFamily: 'JejuHallasan-Regular',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontFamily: 'JejuHallasan-Regular',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        color: '#333',
        backgroundColor: '#FAFAFA',
        fontFamily: 'JejuHallasan-Regular',
    },
    helperText: {
        fontSize: 12,
        color: '#999',
        marginTop: 6,
        fontFamily: 'JejuHallasan-Regular',
    },
    questionText: {
        fontSize: 15,
        color: '#666',
        marginBottom: 15,
        fontWeight: '500',
        fontFamily: 'JejuHallasan-Regular',
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 30,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#4A7856',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4A7856',
    },
    radioLabel: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'JejuHallasan-Regular',
    },
    submitButton: {
        backgroundColor: '#4A7856',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    submitButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'JejuHallasan-Regular',
    },
});

export default PhotoInformation;