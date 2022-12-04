import { StyleSheet } from "react-native";
import Card from "../components/date/Card";
import { colors } from './colors';
import { fontSizes } from "./fonts";
import { CARD, SCREEN_WIDTH, SCREEN_HEIGHT } from "./variables";

const container = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBackground,
    },
    scrollViewContainer: {
        width: '100%',
    },  
    inputContainer: {
        width: '80%',
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    addButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    splash: {
        padding: 200,
        height: '100%',
        width: '100%',
        backgroundColor: colors.accentPink,
    },
    dateContainer: {
        padding: 10,
        margin: 2,
        borderWidth: 1,
        borderRadius: 5,
        minWidth: '80%',
    },  
    swipeContainer: {
        position: 'absolute',
    },
});

const button = StyleSheet.create({
    mainButton: {
        backgroundColor: colors.accentPink,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    accentButton: {
        backgroundColor: colors.white,
        marginTop: 5,
        borderColor: colors.accentPink,
        borderWidth: 2,
    },
    mainButtonText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: fontSizes.button,
    },
    accentButtonText: {
        color: colors.accentPink,
        fontWeight: '700',
        fontSize: fontSizes.button,
    },
    headerRightButton: {
        marginRight: 10,
    },
    imageButton: {
        backgroundColor: colors.white,
        borderColor: colors.accentPink,
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    }
});

const form = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
    bottomStatement: {
        alignContent: 'center',
        borderTopColor: colors.gray,
        borderTopWidth: 1,
        padding: 10,
        textAlign: 'center',
        marginTop: 10,
    },
});

const text = StyleSheet.create({
    linkText: {
        color: colors.accentPink,
    },
    headerText: {
        color: colors.black,
        fontSize: fontSizes.header,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    small: {
        color: colors.black,
    },
    center: {
        textAlign: 'center',
    },
    delete: {
        color: colors.red,
    },
});

const list = StyleSheet.create({
    highlighted: {
        borderWidth: 1,
    }
});

const image = StyleSheet.create({
    dateImage: {
        width: CARD.WIDTH,
        height: CARD.HEIGHT - 120,
        borderRadius: CARD.BORDER_RADIUS,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        borderRadius: CARD.BORDER_RADIUS,
    },
    formImage: {
        borderRadius: CARD.BORDER_RADIUS,
        maxWidth: '100%',
        maxHeight: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
    }
});

export { container, button, form, text, list, image }