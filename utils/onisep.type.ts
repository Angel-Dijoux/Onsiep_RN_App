import { type FormationListItem } from "../shared/formation/fomationv2.type";

export interface UserFavoris {
  results: FormationListItem[];
  size?: number;
}

export interface OldFormation {
  code_nsf: string;
  code_rncp: string;
  duree: string;
  id: number;
  libelle_formation_principal: string;
  libelle_niveau_de_certification: string;
  libelle_type_formation: string;
  niveau_de_certification: string;
  niveau_de_sortie_indicatif: string;
  sigle_formation: string;
  sigle_type_formation: string;
  tutelle: string;
  url_et_id_onisep: string;
}
