export type StudentInfo = [motherName: string, student:
	[studentName: string, studentNameGenitive: string]]

export type Students = {
	[id: number]: StudentInfo
}

const students: Students = {
	0: ["Мать Нулевого", ["Нулевой", "Нулевого"]],
}
export default students;
