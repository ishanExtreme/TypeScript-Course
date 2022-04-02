type RemoveAction = {
    type: "remove_field",
    id: number
};

type AddAction = {
    type: "add_field",
};

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


export type FormAction = AddAction | RemoveAction | UpdateTitle | LabelChange | AddOption | ClearFields;


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

export type PreviewAction = ValueChange | OptionSelect | MultiSelect;