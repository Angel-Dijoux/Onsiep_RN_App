export type Formation = {
  code_nsf: string;
  domain: string;
  libelle: string;
  tutelle: string;
  niveau_de_sortie: string;
  type: string;
  url: string;
  duree: string;
};

export type Formations = {
  formations: Formation[];
  total: number;
};
