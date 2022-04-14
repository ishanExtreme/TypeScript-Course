import { formData, formField } from "./form";

type RemoveAction = {
    type: "remove_field",
    id: number
};

type AddAction = {
    type: "add_field",
    field:formField
};

type InitialStage = {
    type: "initial_stage"
    stage: formData
}

type UpdateTitle = {
    type: "update_title",
    title: string
};

type LabelChange = {
    type: "label_change",
    label: string
    id: string
};

type AddOption = {
    type: "add_option",
    option: string,
    id: string
}

type ClearFields = {
    type: "clear"
}


export type FormAction = AddAction | RemoveAction | UpdateTitle | LabelChange | AddOption | ClearFields | InitialStage;


type ValueChange = {
    type: "value_change",
    id: string,
    value: string
}

type OptionSelect = {
    type: "option_select",
    option: string,
    id: number
}

type MultiSelect = {
    type: "multi_select",
    option: string,
    add: boolean,
    id: number
}

type InitialStagePrev = {
    type: "initial_stage",
    stage: formField
}

export type PreviewAction = ValueChange | OptionSelect | MultiSelect | InitialStagePrev;