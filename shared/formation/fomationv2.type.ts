export type Formation = {
  code_nsf: number;
  created_at: null | string;
  domain: string;
  duree: string;
  id: null | number;
  libelle: string;
  niveau_de_sortie: string;
  tutelle: string;
  type: string;
  updated_at: null | string;
  url: string;
};

export type FormationListItem = {
  formation: Formation;
  is_favorite: boolean;
};

export type Formations = {
  formations: FormationListItem[];
  total: number;
};
