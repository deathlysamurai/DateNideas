const { Dimensions } = require("react-native");

const {width, height} = Dimensions.get('screen');

export const CARD = {
    WIDTH: width * 0.9,
    HEIGHT: height *0.78,
    BORDER_RADIUS: 20,
    OUT_WIDTH: width + width * 0.9,
    OUT_HEIGHT: height + height * 0.9,
};

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const ACTION_OFFSET = 100;
export const HEIGHT_ACTION_OFFSET = height / 3;