export interface formField{
    id: number;
    label: string;
    type: string;
    value: string;
}


export interface formData {
    id: number;
    title: string;
    formFields: formField[];
}
