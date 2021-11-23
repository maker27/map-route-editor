import ymaps, { IClassConstructor, ILayout } from 'yandex-maps';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export type TMap = ymaps.Map;

export type TCoordinates = number[];

export type TPlacemark = {
    name: string;
    hint: string;
    coord: TCoordinates;
};

export type TemplateType = IClassConstructor<ILayout>;

export type TMutableRef<T> = MutableRefObject<T | undefined>;

export type TSetState<T> = Dispatch<SetStateAction<T>>;

export interface IClassnameComponentProps {
    className?: string;
}
