export interface formData {
    id: number;
    title: string;
    description: string;
    is_public: boolean;
    formFields: formField[];
}

export type textFieldType = "text" | "email" | "date" | "tel"

type textField = {
    kind: textFieldType,
    id: number;
    label: string;
    value: string;
}

type dropDownField = {
    kind: "dropdown",
    id: number;
    label: string;
    options: string[];
    value: string;
}

type textArea = {
    kind: "textArea",
    id: number;
    label: string;
    value: string;
}

type radioButton = {
    kind: "radio",
    id: number,
    // had to add bcz of typescript error checking
    label: string,
    value: string,
    options: string[]
}

type multiSelect = {
    kind: "multiselect",
    id: number,
    label: string,
    value: string[],
    options: string[]
}

export type fieldType = textFieldType | "dropdown" | "textArea" | "radio" | "multiselect"


export type formField = textField | dropDownField | textArea | radioButton | multiSelect;
   
