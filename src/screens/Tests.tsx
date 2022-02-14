import {useState} from "react";
import subjectsThemes from "../subjectsThemes";


const TestLessonID_regexp = /\w\.\d+\.[0-9A-Z]+/

const nOfTestsWithPreviousTeacherOfStudent: { [id: string]: number } = {
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
}

function Tests() {
	//TODO warning new Frontend and old Frontend have different number of tests
	const [input, setInput] = useState("")
	const [output, setOutput] = useState("")
	const okHandler = (getWhat: "names" | "count") => {
		let output = "";
		let studentsTopics = input.split("\n");
		let found = false;
		let tests = [];
		for (let i = 0; i < studentsTopics.length; i++) {
			let sTMatch = studentsTopics[i].match(TestLessonID_regexp);
			if (sTMatch === null) {
				output += `${studentsTopics[i]}no match /\\w\\.\\d+\\.[0-9A-Z]+/ \n`;
				continue;
			}
			const sT: string = sTMatch[0]
			let r = studentsTopics[i].match(/^(?:\d+ )?(\d+)/);
			if (r == null) {
				alert("First column should be studentID (second - topic)");
				return;
			}
			let sId = r[1]
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
			if (nOfTestsWithPreviousTeacherOfStudent[sId]) {
				tests.splice(0, nOfTestsWithPreviousTeacherOfStudent[sId]);
			}
			if (found) {
				output += `${getWhat === "names" ? tests.join(" ") : tests.length}\n`;
			} else {
				output += `${sT} NOT f(${i})\n`;
			}
		}
		setOutput(output)
	};
	return (
		<div>
			<div className="tests__areas">
				<textarea value={input} onChange={
					(e) => setInput(e.target.value)
				}/>
				<textarea value={output}/>
			</div>
			<br/>
			<button onClick={() => okHandler("names")}>Get tests' names</button>
			<button onClick={() => okHandler("count")}>Get tests count</button>
		</div>
	);
}

export default Tests;
