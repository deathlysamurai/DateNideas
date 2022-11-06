import { StyleSheet } from "react-native";
import { colors } from './colors';
import { fontSizes } from "./fonts";

const container = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBackground,
    },
    inputContainer: {
        width: '80%',
    },
    buttonContainer: {
        width: '60%',
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
    }
});

const list = StyleSheet.create({
    highlighted: {
        borderWidth: 1,
    }
});

export { container, button, form, text, list }