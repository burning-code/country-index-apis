import { Currency } from './currency.interface';
import { Language } from './language.interface';

export interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital?: string;
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  latlng?: number[];
  demonym?: string;
  area?: number;
  gini?: number;
  timezones?: string[];
  nativeName?: string;
  currencies?: Currency[];
  languages?: Language[];
  flag?: string;
  cioc?: string;
}
