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