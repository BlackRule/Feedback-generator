import {Component} from "react";
import subjectsThemes from "../subjectsThemes";


const TestLessonID_regexp = /\w\.\d+\.[0-9A-Z]+/;

const nOfTestsWithPreviousTeacherOfStudent = {
	24338: 4,
	24817: 1,
	44045: 1,
	44640_1: 1,//Python
	52437: 1,
	47753: 4,
	35475: 2,
	39728: 2,
	40476: 4,
	64366: 1,
	29012: 3
};

class Tests extends Component {
	//TODO warning new Frontend and old Frontend have different number of tests
	state = {
		input: "",
		output: ""
	}
	okHandler = (getWhat) => {
		let output = "";
		let studentsTopics = this.state.input.split("\n");
		let found = false;
		let tests = [];
		for (let i = 0; i < studentsTopics.length; i++) {
			let sT = studentsTopics[i].match(TestLessonID_regexp);
			let r=studentsTopics[i].match(/^(?:\d+ )?(\d+)/);
			if(r==null){
				alert("First column should be studentID (second - topic)");
				return;
			}
			let sId = r[1];
			if (sT != null) {
				sT = sT[0];
			} else {
				output += `${studentsTopics[i]}no match /\\w\\.\\d+\\.[0-9A-Z]+/ \n`;
				continue;
			}
			outerLoop:
				for (let s of subjectsThemes) {
					tests = [];
					for (let lvl of s.levels) {
						for (let t of lvl.topics) {
							if (t.fullName.indexOf(sT) !== -1) {
								found = true;
								break outerLoop;
							}
							if (t.type === "TEST") {
								tests.push(t.fullName.match(TestLessonID_regexp));
							}
						}
					}
				}
			if (nOfTestsWithPreviousTeacherOfStudent[sId]){
				tests.splice(0, nOfTestsWithPreviousTeacherOfStudent[sId]);
			}
			if (found) {
				output += `${getWhat === "names" ? tests.join(" ") : tests.length}\n`;
			} else {
				output += `${sT} NOT f(${i})\n`;
			}
		}
		this.setState({
			output: output
		});

	};
	changeHandler = (e) => {
		this.setState({
			input: e.target.value
		});
	}

	render = () => {
		return (
			<div>
				<div className="tests__areas">
					<textarea value={this.state.input} onChange={this.changeHandler}/>
					<textarea value={this.state.output}/>
				</div>
				<br/>
				<button onClick={() => {
					this.okHandler("names")
				}}>Get tests' names
				</button>
				<button onClick={() => {
					this.okHandler("count")
				}}>Get tests count
				</button>
			</div>
		);
	}
}

export default Tests;
