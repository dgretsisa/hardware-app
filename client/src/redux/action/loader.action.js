import { Types } from '../types/loader.types';

const loaderShow = () => {
    return {
        type: Types.LOADER_SHOW
    };
}

const loaderHide = () => {
    return {
        type: Types.LOADER_HIDE
    };
}

export {
    loaderShow,
    loaderHide
}
