export interface facility {
    id?: number;
    name?: string;
    user_id?: number;
    number?: string;
    used?: string;
    size?: string;
    unity?: string;
    report_last_update?: string;
    consultant_name?: string;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    zip_code?: string;
    year_installed?: string;
    replacement_cost?: string;
    description?: string;
    images?: Image[];
}

export interface Image {
    filename: string[];
    path: string;
    facility_id: number;
}
  
  