import './CurrentClimbingLevel.css';

/**
 * CurrentClimbingLevel Component
 * 
 * Displays user's current climbing level based on highest grade with 3+ routes completed
 * 
 * Props:
 * - climbs: array of climb objects (cards)
 */
export default function CurrentClimbingLevel({ climbs }) {
    /**
     * Converts grade from string to integer
     * @param {string} grade - climb grade
     * @returns {number} integer grade
     */
    function gradeToNumber(grade) {
        return parseInt(grade.replace(/^V/i, ''), 10);
    }

    /**
     * Determines highest grade with 3+ routes completed
     * @param {Array} climbs - list of climb objects (cards)
     * @param {number} minClimbs - Minimum climbs required to count
     * @returns {string} Highest grade meeting 3+ routes completed criteria or "NA"
     */
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

        // Determine highest eligible grade
        let highest = eligibleGrades[0];
        for (const grade of eligibleGrades) {
            if (gradeToNumber(grade) > gradeToNumber(highest)) {
                highest = grade;
            }
        }

        return highest;
    } 

    // Store highest eligible grade to determine climbing level
    const currentGrade = highestGrade(climbs);

    return (
        <div className='current-level-container'>
            <h1 className='grade-header'>{currentGrade}</h1>
        </div>
    );
}