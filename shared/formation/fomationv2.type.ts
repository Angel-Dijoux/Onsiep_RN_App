export type Formation = {
  code_nsf: number;
  created_at?: Date;
  domain: string;
  duree: string;
  id?: string;
  libelle: string;
  niveau_de_sortie: string;
  tutelle: string;
  type: string;
  updated_at?: Date;
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
