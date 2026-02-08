
import { updateDynamic } from "../features/dynamicIslandSlice"

export const showDynamic = (dispatch, content) => {
    dispatch(updateDynamic({ title: "", content }));
};