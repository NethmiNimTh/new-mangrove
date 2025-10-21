//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Platform, Image, Modal, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// component
const AnimalDataCollection = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const category = route.params?.category || 'Animal';
    const [currentLanguage, setCurrentLanguage] = useState('en');

    const [animalType, setAnimalType] = useState('');
    const [showAnimalPicker, setShowAnimalPicker] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [description, setDescription] = useState('');

    // Translation object
    const translations = {
        en: {
            title: 'Animals',
            animalType: 'Animal Type',
            selectAnimalType: 'Select Animal Type',
            photo: 'Photo',
            date: 'Date',
            timeOfDay: 'Time of Day',
            description: 'Description (Optional)',
            submit: 'Submit',
            photoPlaceholder: 'Tap to upload or capture a photo',
            chooseOption: 'Choose an option',
            camera: 'Camera',
            gallery: 'Gallery',
            cancel: 'Cancel',
            requiredField: 'Required Field',
            selectAnimalAlert: 'Please select an animal type',
            uploadPhoto: 'Please upload a photo',
            selectTimeOfDay: 'Please select time of day',
            descriptionPlaceholder: 'Add any additional notes about your observation...',
            // Animal categories
            mammals: 'Mammals',
            birds: 'Birds',
            reptilesAmphibians: 'Reptiles & Amphibians',
            // Mammals
            deer: 'Deer',
            fox: 'Fox',
            rabbit: 'Rabbit',
            squirrel: 'Squirrel',
            bat: 'Bat',
            otherMammal: 'Other Mammal',
            // Birds
            songbird: 'Songbird',
            birdOfPrey: 'Bird of Prey',
            waterfowl: 'Waterfowl',
            wadingBird: 'Wading Bird',
            otherBird: 'Other Bird',
            // Reptiles & Amphibians
            snake: 'Snake',
            lizard: 'Lizard',
            turtle: 'Turtle',
            frog: 'Frog',
            otherReptileAmphibian: 'Other Reptile/Amphibian',
            // Time options
            morning: 'Morning',
            noon: 'Noon',
            evening: 'Evening',
            night: 'Night'
        },
        si: {
            title: 'සතුන්',
            animalType: 'සත්ව වර්ගය',
            selectAnimalType: 'සත්ව වර්ගය තෝරන්න',
            photo: 'ඡායාරූපය',
            date: 'දිනය',
            timeOfDay: 'දවසේ වේලාව',
            description: 'විස්තරය (අත්‍යවශ්‍ය නොවේ)',
            submit: 'ඉදිරිපත් කරන්න',
            photoPlaceholder: 'ඡායාරූපය ගැනීම/ ඇතුලත් කිරීම මෙහිදී සිදු කරන්න',
            chooseOption: 'විකල්පයක් තෝරන්න',
            camera: 'කැමරාව',
            gallery: 'ගැලරිය',
            cancel: 'අවලංගු කරන්න',
            requiredField: 'අවශ්‍ය ක්ෂේත්‍රය',
            selectAnimalAlert: 'කරුණාකර සත්ව වර්ගයක් තෝරන්න',
            uploadPhoto: 'කරුණාකර ඡායාරූපයක් උඩුගත කරන්න',
            selectTimeOfDay: 'කරුණාකර දවසේ වේලාව තෝරන්න',
            descriptionPlaceholder: 'ඔබේ නිරීක්ෂණය ගැන අමතර සටහන් එක් කරන්න...',
            // Animal categories
            mammals: 'ක්ෂීරපායීන්',
            birds: 'පක්ෂීන්',
            reptilesAmphibians: 'උරගයින් සහ උභයජීවීන්',
            // Mammals
            deer: 'මුව',
            fox: 'හිවලා',
            rabbit: 'හාවා',
            squirrel: 'ලේනා',
            bat: 'වවුලා',
            otherMammal: 'වෙනත් ක්ෂීරපායීන්',
            // Birds
            songbird: 'ගීත පක්ෂියා',
            birdOfPrey: 'විලෝපික පක්ෂියා',
            waterfowl: 'ජල කුරුල්ලන්',
            wadingBird: 'වතුර පක්ෂියා',
            otherBird: 'වෙනත් පක්ෂියා',
            // Reptiles & Amphibians
            snake: 'සර්පයා',
            lizard: 'කටුස්සා',
            turtle: 'ඉබ්බා',
            frog: 'ගෙම්බා',
            otherReptileAmphibian: 'වෙනත් උරගයා/උභයජීවීන්',
            // Time options
            morning: 'උදෑසන',
            noon: 'මධ්‍යාහ්නය',
            evening: 'සවස',
            night: 'රාත්‍රිය'
        },
        ta: {
            title: 'விலங்குகள்',
            animalType: 'விலங்கு வகை',
            selectAnimalType: 'விலங்கு வகையைத் தேர்ந்தெடுக்கவும்',
            photo: 'புகைப்படம்',
            date: 'தேதி',
            timeOfDay: 'நாளின் நேரம்',
            description: 'விளக்கம் (விருப்பமானது)',
            submit: 'சமர்ப்பிக்கவும்',
            photoPlaceholder: 'புகைப்படத்தைப் பதிவேற்ற அல்லது எடுக்க தட்டவும்',
            chooseOption: 'ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
            camera: 'கேமரா',
            gallery: 'கேலரி',
            cancel: 'ரத்துசெய்',
            requiredField: 'தேவையான புலம்',
            selectAnimalAlert: 'தயவுசெய்து ஒரு விலங்கு வகையைத் தேர்ந்தெடுக்கவும்',
            uploadPhoto: 'தயவுசெய்து ஒரு புகைப்படத்தைப் பதிவேற்றவும்',
            selectTimeOfDay: 'தயவுசெய்து நாளின் நேரத்தைத் தேர்ந்தெடுக்கவும்',
            descriptionPlaceholder: 'உங்கள் கவனிப்பு பற்றிய கூடுதல் குறிப்புகளைச் சேர்க்கவும்...',
            // Animal categories
            mammals: 'பாலூட்டிகள்',
            birds: 'பறவைகள்',
            reptilesAmphibians: 'ஊர்வன & நீர்நில விலங்குகள்',
            // Mammals
            deer: 'மான்',
            fox: 'நரி',
            rabbit: 'முயல்',
            squirrel: 'அணில்',
            bat: 'வெளவால்',
            otherMammal: 'பிற பாலூட்டி',
            // Birds
            songbird: 'பாடும் பறவை',
            birdOfPrey: 'வேட்டைப் பறவை',
            waterfowl: 'நீர்ப்பறவை',
            wadingBird: 'நடக்கும் பறவை',
            otherBird: 'பிற பறவை',
            // Reptiles & Amphibians
            snake: 'பாம்பு',
            lizard: 'பல்லி',
            turtle: 'ஆமை',
            frog: 'தவளை',
            otherReptileAmphibian: 'பிற ஊர்வன/நீர்நில விலங்கு',
            // Time options
            morning: 'காலை',
            noon: 'மதியம்',
            evening: 'மாலை',
            night: 'இரவு'
        }
    };

    // Load saved language preference
    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('userLanguage');
            if (savedLanguage) {
                setCurrentLanguage(savedLanguage);
            }
        } catch (error) {
            console.error('Error loading language:', error);
        }
    };

    // Get current translations
    const t = translations[currentLanguage] || translations.en;

    const animalCategories = {
        [t.mammals]: [
            { value: 'Deer', label: t.deer },
            { value: 'Fox', label: t.fox },
            { value: 'Rabbit', label: t.rabbit },
            { value: 'Squirrel', label: t.squirrel },
            { value: 'Bat', label: t.bat },
            { value: 'Other Mammal', label: t.otherMammal }
        ],
        [t.birds]: [
            { value: 'Songbird', label: t.songbird },
            { value: 'Bird of Prey', label: t.birdOfPrey },
            { value: 'Waterfowl', label: t.waterfowl },
            { value: 'Wading Bird', label: t.wadingBird },
            { value: 'Other Bird', label: t.otherBird }
        ],
        [t.reptilesAmphibians]: [
            { value: 'Snake', label: t.snake },
            { value: 'Lizard', label: t.lizard },
            { value: 'Turtle', label: t.turtle },
            { value: 'Frog', label: t.frog },
            { value: 'Other Reptile/Amphibian', label: t.otherReptileAmphibian }
        ]
    };

    const timeOptions = [
        { value: 'Morning', label: t.morning },
        { value: 'Noon', label: t.noon },
        { value: 'Evening', label: t.evening },
        { value: 'Night', label: t.night }
    ];

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handlePhotoUpload = () => {
        setShowImagePicker(true);
    };

    const handleCamera = () => {
        setShowImagePicker(false);
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                Alert.alert('Error', 'Failed to open camera: ' + response.errorMessage);
            } else if (response.assets && response.assets[0]) {
                setPhoto(response.assets[0].uri);
            }
        });
    };

    const handleGallery = () => {
        setShowImagePicker(false);
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled gallery');
            } else if (response.errorCode) {
                Alert.alert('Error', 'Failed to open gallery: ' + response.errorMessage);
            } else if (response.assets && response.assets[0]) {
                setPhoto(response.assets[0].uri);
            }
        });
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleAnimalSelect = (animal) => {
        setAnimalType(animal);
        setShowAnimalPicker(false);
    };

    const handleSubmit = () => {
        if (!animalType) {
            Alert.alert(t.requiredField, t.selectAnimalAlert);
            return;
        }

        if (!photo) {
            Alert.alert(t.requiredField, t.uploadPhoto);
            return;
        }

        if (!timeOfDay) {
            Alert.alert(t.requiredField, t.selectTimeOfDay);
            return;
        }

        const observationData = {
            category,
            animalType,
            photo,
            date: date.toISOString().split('T')[0],
            timeOfDay,
            description
        };
        console.log('Submit observation:', observationData);
        navigation.navigate('CreditInterface', { observationData });
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Get display label for current animal type
    const getCurrentAnimalLabel = () => {
        for (const animals of Object.values(animalCategories)) {
            const found = animals.find(a => a.value === animalType);
            if (found) return found.label;
        }
        return t.selectAnimalType;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                    <Text style={styles.title}>{t.title}</Text>
                </View>

                {/* Form Content */}
                <View style={styles.formContainer}>
                    {/* Animal Type Dropdown */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.animalType} <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity 
                            style={styles.dropdown}
                            onPress={() => setShowAnimalPicker(true)}
                        >
                            <Text style={[styles.dropdownText, !animalType && styles.placeholder]}>
                                {getCurrentAnimalLabel()}
                            </Text>
                            <Icon name="arrow-drop-down" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Photo Upload */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.photo} <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity 
                            style={styles.photoUploadArea}
                            onPress={handlePhotoUpload}
                            activeOpacity={0.7}
                        >
                            {photo ? (
                                <View style={styles.photoContainer}>
                                    <Image source={{ uri: photo }} style={styles.uploadedPhoto} />
                                    <TouchableOpacity 
                                        style={styles.removePhotoButton}
                                        onPress={() => setPhoto(null)}
                                        activeOpacity={0.8}
                                    >
                                        <Icon name="close" size={20} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.photoPlaceholder}>
                                    <Icon name="photo-camera" size={50} color="#CCC" />
                                    <Text style={styles.photoPlaceholderText}>
                                        {t.photoPlaceholder}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Date Picker */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.date} <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity 
                            style={styles.dateInput}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(date)}</Text>
                            <Icon name="calendar-today" size={20} color="#666" />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                    </View>

                    {/* Time of Day */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.timeOfDay} <Text style={styles.required}>*</Text></Text>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioRow}>
                                <TouchableOpacity 
                                    style={styles.radioItem}
                                    onPress={() => setTimeOfDay('Morning')}
                                >
                                    <RadioButton
                                        value="Morning"
                                        status={timeOfDay === 'Morning' ? 'checked' : 'unchecked'}
                                        onPress={() => setTimeOfDay('Morning')}
                                        color="#4A7856"
                                    />
                                    <Text style={styles.radioLabel}>{t.morning}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.radioItem}
                                    onPress={() => setTimeOfDay('Noon')}
                                >
                                    <RadioButton
                                        value="Noon"
                                        status={timeOfDay === 'Noon' ? 'checked' : 'unchecked'}
                                        onPress={() => setTimeOfDay('Noon')}
                                        color="#4A7856"
                                    />
                                    <Text style={styles.radioLabel}>{t.noon}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.radioRow}>
                                <TouchableOpacity 
                                    style={styles.radioItem}
                                    onPress={() => setTimeOfDay('Evening')}
                                >
                                    <RadioButton
                                        value="Evening"
                                        status={timeOfDay === 'Evening' ? 'checked' : 'unchecked'}
                                        onPress={() => setTimeOfDay('Evening')}
                                        color="#4A7856"
                                    />
                                    <Text style={styles.radioLabel}>{t.evening}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.radioItem}
                                    onPress={() => setTimeOfDay('Night')}
                                >
                                    <RadioButton
                                        value="Night"
                                        status={timeOfDay === 'Night' ? 'checked' : 'unchecked'}
                                        onPress={() => setTimeOfDay('Night')}
                                        color="#4A7856"
                                    />
                                    <Text style={styles.radioLabel}>{t.night}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.description}</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder={t.descriptionPlaceholder}
                            placeholderTextColor="#AAA"
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitButtonText}>{t.submit}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Animal Type Picker Modal */}
            <Modal
                visible={showAnimalPicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowAnimalPicker(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t.selectAnimalType}</Text>
                            <TouchableOpacity 
                                onPress={() => setShowAnimalPicker(false)}
                                style={styles.modalCloseButton}
                            >
                                <Icon name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalContent}>
                            {Object.entries(animalCategories).map(([categoryName, animals]) => (
                                <View key={categoryName} style={styles.categorySection}>
                                    <Text style={styles.categoryTitle}>{categoryName}</Text>
                                    <View style={styles.animalGrid}>
                                        {animals.map((animal) => (
                                            <TouchableOpacity
                                                key={animal.value}
                                                style={[
                                                    styles.animalOption,
                                                    animalType === animal.value && styles.animalOptionSelected
                                                ]}
                                                onPress={() => handleAnimalSelect(animal.value)}
                                            >
                                                <Text style={[
                                                    styles.animalOptionText,
                                                    animalType === animal.value && styles.animalOptionTextSelected
                                                ]}>
                                                    {animal.label}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Image Picker Modal */}
            <Modal
                visible={showImagePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowImagePicker(false)}
            >
                <View style={styles.imagePickerOverlay}>
                    <View style={styles.imagePickerContainer}>
                        <Text style={styles.imagePickerTitle}>{t.chooseOption}</Text>
                        
                        <View style={styles.imagePickerOptions}>
                            <TouchableOpacity 
                                style={styles.imagePickerOption}
                                onPress={handleCamera}
                                activeOpacity={0.7}
                            >
                                <Icon name="photo-camera" size={50} color="#4A7856" />
                                <Text style={styles.imagePickerOptionText}>{t.camera}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.imagePickerOption}
                                onPress={handleGallery}
                                activeOpacity={0.7}
                            >
                                <Icon name="photo-library" size={50} color="#4A7856" />
                                <Text style={styles.imagePickerOptionText}>{t.gallery}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.imagePickerCancelButton}
                            onPress={() => setShowImagePicker(false)}
                        >
                            <Text style={styles.imagePickerCancelText}>{t.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: 'JejuHallasan-Regular',
        color: '#4A7856',
        fontWeight: 'bold',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontFamily: 'JejuHallasan-Regular',
    },
    required: {
        color: '#E74C3C',
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'JejuHallasan-Regular',
    },
    placeholder: {
        color: '#999',
    },
    photoUploadArea: {
        borderWidth: 2,
        borderColor: '#DDD',
        borderStyle: 'dashed',
        borderRadius: 8,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    photoPlaceholder: {
        alignItems: 'center',
    },
    photoPlaceholderText: {
        marginTop: 10,
        fontSize: 14,
        color: '#999',
        fontFamily: 'JejuHallasan-Regular',
    },
    photoContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    uploadedPhoto: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    removePhotoButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#E74C3C',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'JejuHallasan-Regular',
    },
    radioContainer: {
        marginTop: 5,
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5,
        fontFamily: 'JejuHallasan-Regular',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        minHeight: 100,
        fontFamily: 'JejuHallasan-Regular',
    },
    submitButton: {
        backgroundColor: '#4A7856',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
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
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'JejuHallasan-Regular',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'JejuHallasan-Regular',
    },
    modalCloseButton: {
        padding: 5,
    },
    modalContent: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    categorySection: {
        marginBottom: 25,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A7856',
        marginBottom: 12,
        fontFamily: 'JejuHallasan-Regular',
    },
    animalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    animalOption: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        minWidth: '47%',
    },
    animalOptionSelected: {
        backgroundColor: '#4A7856',
        borderColor: '#4A7856',
    },
    animalOptionText: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'JejuHallasan-Regular',
    },
    animalOptionTextSelected: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    // Image Picker Modal Styles
    imagePickerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    imagePickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        maxWidth: 350,
        borderWidth: 3,
        borderColor: '#4A7856',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    imagePickerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 25,
        fontFamily: 'JejuHallasan-Regular',
    },
    imagePickerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    imagePickerOption: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        width: 130,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    imagePickerOptionText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        fontWeight: '600',
        fontFamily: 'JejuHallasan-Regular',
    },
    imagePickerCancelButton: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    imagePickerCancelText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
        fontFamily: 'JejuHallasan-Regular',
    },
});

export default AnimalDataCollection