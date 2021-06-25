import { shallowEqual, useSelector } from "react-redux";
import { RootType } from "../index";

export const NewsSelector = () => {
    const { news } = useSelector(({ news }: RootType) => news, shallowEqual)
    return { news }
}
