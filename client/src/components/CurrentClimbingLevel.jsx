import './CurrentClimbingLevel.css';

export default function CurrentClimbingLevel({ climbs }) {
   

    // Functions to calculate highest grade with 3+ climbs
    function gradeToNumber(grade) {
        return parseInt(grade.replace(/^V/i, ''), 10);
    }
    function highestGrade(climbs, minClimbs = 3) {
        // Count how many climbs per grade
        const gradeCount = {};
        for (const climb of climbs) {
            const grade = climb.grade;
            if (!gradeCount[grade]) {
                gradeCount[grade] = 0;
            }
            gradeCount[grade]++;
        }
        
        // Filter grades that meet minimum climbs
        const eligibleGrades = [];
        for (const grade in gradeCount) {
            if (gradeCount[grade] >= minClimbs) {
                eligibleGrades.push(grade);
            }
        }

        if (eligibleGrades.length === 0) {
            return "NA";
        }

        // Find highest grade
        let highest = eligibleGrades[0];
        for (const grade of eligibleGrades) {
            if (gradeToNumber(grade) > gradeToNumber(highest)) {
                highest = grade;
            }
        }

        return highest;
    } 

    const currentGrade = highestGrade(climbs);

    return (
        <div className='current-level-container'>
            <h1 className='grade-header'>{currentGrade}</h1>
        </div>
    );
}