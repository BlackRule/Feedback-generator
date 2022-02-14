import React, {CSSProperties, Fragment} from "react";
import Select, {GroupBase} from 'react-select'
import {Students} from "../students";
import {Props} from "react-select/dist/declarations/src/Select";

export type StudentSelectOption = {value: string, label:string}

function StudentSelect<
	IsMulti extends boolean = false,
	Group extends GroupBase<StudentSelectOption> = GroupBase<StudentSelectOption>
	>(props: Partial<Props<StudentSelectOption, IsMulti, Group>> & {students:Students, style:CSSProperties}){
	const options:StudentSelectOption[] = Object.entries(props.students).map((value) => {
		return {value: value[0], label: `${value[0]}: ${value[1][0]} ${value[1][1][0]}`}
	})
	const {style, ...p} = props
	return (<Fragment>
		<label style={style}>Student Id: <Select {...p} options={options}/></label>
	</Fragment>)
}
export default StudentSelect;
