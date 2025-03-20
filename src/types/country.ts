export interface Country {
  name: {
    common: string;
  };
  region: string;
  population: number;
  flags: {
    png: string;
  };
}

export enum Region {
  All = 'All',
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}
