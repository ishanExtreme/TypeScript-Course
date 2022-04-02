export interface formData {
    id: number;
    title: string;
    formFields: formField[];
}


type textField = {
    kind: "text",
    id: number;
    label: string;
    type: string;
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



export type formField = textField | dropDownField | textArea | radioButton | multiSelect;
   
