import { Country } from "./country.interface"
import { Region } from "./region.type";

export interface CacheStore {
    byCapital:      TermCountries;
    byCountries:    TermCountries;
    byRegion:       TermCountries;
}

export interface TermCountries {
    term: string, 
    countries: Country[] 
}

export interface RegionCountries {
    region: Region;
    countries: Country[];
}

