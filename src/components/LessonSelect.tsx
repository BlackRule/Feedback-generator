import React, {CSSProperties, Fragment} from "react";
import Select, {GroupBase} from 'react-select'
import {SubjectsThemes} from "../subjectsThemes";
import {Props} from "react-select/dist/declarations/src/Select";

type LessonSelectProps = { subjectsThemes: SubjectsThemes, label: string, style?: CSSProperties }
export type LessonSelectOption = {value: string, label:string}
type LessonSelectOptionGroup = GroupBase<LessonSelectOption>

function LessonSelect<
	IsMulti extends boolean = false,
	
	>(props: Partial<Props<LessonSelectOption, IsMulti, LessonSelectOptionGroup>> & LessonSelectProps) {

	let options: LessonSelectOptionGroup[] = [];

	for (let s = 0; s < props.subjectsThemes.length; s++) {
		let levels = props.subjectsThemes[s].levels;
		const groupOptions=[]
		for (let l = 0; l < levels.length; l++) {
			let level = levels[l];
			let len = level.topics.length;
			for (let i = 0; i < len; i++) {
				groupOptions.push({
					value: `${s}_${l}_${i}`,
					label: level.topics[i].fullName
				} );
			}
		}
		options.push({label: props.subjectsThemes[s].name, options: groupOptions});
	}
	const {style, ...p} = props
	return (<Fragment>
		<label style={style}>{props.label} <Select {...p} options={options}/></label>
	</Fragment>)
}
export default LessonSelect;
