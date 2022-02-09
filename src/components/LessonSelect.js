import {Fragment} from "react";
import Select from 'react-select'

/**
 *
 * @param {object} props
 * @property {SubjectsThemes} props.subjectsThemes
 * @returns {JSX.Element}
 * @constructor
 */
function LessonSelect(props){
	/***
	 * @typedef {Object} ROption
	 * @property {String} label
	 * @property {String} value
	 */
	/***
	 * @typedef {Object} ROptgroup
	 * @property {String} label
	 * @property {[ROption]} options
	 */
	/***
	 * @type {[ROption|ROptgroup]}
	 */
	let options=[];

	for (let s = 0; s < props.subjectsThemes.length; s++) {
		let levels = props.subjectsThemes[s].levels;
		let optgroup = {label:props.subjectsThemes[s].name,options:[]};
		options.push(optgroup);
		for (let l = 0; l < levels.length; l++) {
			let level = levels[l];
			let len = level.topics.length;
			for (let i = 0; i < len; i++) {
				optgroup.options.push({
					value:`${s}_${l}_${i}`,
					label:level.topics[i].fullName});
			}
		}
	}
	const {style,...p} = props
	return (<Fragment>
		<label style={style}>{props.label} <Select options={options} {...p}/></label>
	</Fragment>)
}
export default LessonSelect;
