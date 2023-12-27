export interface FormationType {
  annee_derniere_session?: string;
  annee_premiere_session: string;
  attendus: string;
  code_scolarite: string;
  creation_date: string;
  descriptif_acces: string;
  descriptif_format_court: string;
  descriptif_poursuite_etudes?: string;
  duree_formation: string;
  identifiant: string;
  libelle_complet: string;
  libelle_generique?: string;
  libelle_specifique?: string;
  metiers_formation: MetiersFormation;
  modification_date: string;
  nature_certificat: NatureCertificat;
  niv_code: string;
  niveau_certification: string;
  niveau_etudes: NiveauEtudes;
  nsf_discipline: NsfDiscipline;
  nsf_fonction?: NsfFonction;
  poursuites_etudes?: PoursuitesEtudes;
  publications: Publications;
  sigle?: string;
  sources_numeriques?: SourcesNumeriques;
  sous_domaines_web: SousDomainesWeb;
  sous_tutelle: string;
  type_Formation: TypeFormation;
  type_option?: string;
  url: string;
}

export interface MetiersFormation {
  metier: Metier[] | Metier;
}

export interface Metier {
  id: string;
  libelle: string;
  synonymes?: Synonymes;
}

export interface Synonymes {
  synonyme: Synonyme[];
}

export interface Synonyme {
  libelle: string;
  libelle_feminin: string;
}

export interface NatureCertificat {
  libelle_nature_certificat: string;
}

export interface NiveauEtudes {
  id: string;
  libelle: string;
}

export interface NsfDiscipline {
  NSF_discipline_code: string;
  NSF_discipline_libelle: string;
}

export interface NsfFonction {
  NSF_fonction_code: string;
  NSF_fonction_libelle: string;
}

export interface PoursuitesEtudes {
  poursuite_etudes: PoursuiteEtudes;
}

export interface PoursuiteEtudes {
  formation_poursuite_Etudes: string[];
  type_Poursuite: string;
}

export interface Publications {
  publication: Publication[];
}

export interface Publication {
  annee: string;
  code_librairie: string;
  collection: string;
  editeur: string;
  titre_publication: string;
}

export interface SourcesNumeriques {
  source: string;
}

export interface SousDomainesWeb {
  sous_domaine_web: SousDomaineWeb[];
}

export interface SousDomaineWeb {
  id: string;
  libelle: string;
}

export interface TypeFormation {
  type_formation_libelle: string;
  type_formation_libelle_court: string;
  type_formation_sigle: string;
}
