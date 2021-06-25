import { shallowEqual, useSelector } from "react-redux";
import { RootType } from "../index";

export const ErrorsSelector = (): RootType['errors'] => {
    return useSelector(({ errors }: RootType) => errors, shallowEqual)
}
