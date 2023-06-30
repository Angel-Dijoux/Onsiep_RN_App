export interface OnisepFormations {
  total: number;
  size: number;
  from: number;
  results: Result[];
  facets: Facets;
}

export interface Result {
  code_nsf: string;
  sigle_type_formation: string;
  libelle_type_formation: string;
  libelle_formation_principal: string;
  sigle_formation: string;
  duree: string;
  niveau_de_sortie_indicatif: string;
  code_rncp: string;
  niveau_de_certification: string;
  libelle_niveau_de_certification: string;
  tutelle: string;
  url_et_id_onisep: string;
  "domainesous-domaine": string;
}

export interface Facets {
  niveau_de_sortie_indicatif: NiveauDeSortieIndicatif[];
  libelle_niveau_de_certification: LibelleNiveauDeCertification[];
  tutelle: Tutelle[];
  libelle_type_formation: LibelleTypeFormation[];
}

export interface NiveauDeSortieIndicatif {
  key: string;
  doc_count: number;
}

export interface LibelleNiveauDeCertification {
  key: string;
  doc_count: number;
}

export interface Tutelle {
  key: string;
  doc_count: number;
}

export interface LibelleTypeFormation {
  key: string;
  doc_count: number;
}
