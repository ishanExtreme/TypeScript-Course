export interface formData {
    id: number;
    title: string;
    formFields: formField[];
}

type textFieldType = "text" | "email" | "date" | "tel";

type textField = {
    kind: "text",
    id: number;
    label: string;
    type: textFieldType;
    value: string;
}

type dropDownField = {
    kind: "dropdown",
    id: number;
    label: string;
    options: string[];
    value: string;
}



export type formField = textField | dropDownField
   
