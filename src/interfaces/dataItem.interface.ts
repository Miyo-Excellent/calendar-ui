export interface DataItemInterface {
    id: number;
    technician_name: string;
    technician_id: number;
    technician_charge: string;
    technician_picture: string | null;
    ticket: string;
    percentage: number;
    service_type: string;
    service_status: string;
    service_date_start: string;
    service_date_end: string;
  }