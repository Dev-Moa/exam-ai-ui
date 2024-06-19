// utils/parseResponse.js
export function parseResponse(response) {
    if (!response.value) {
      return {
        studentName: '',
        finalScore: '',
        incorrectAnswers: 0,
        results: [],
        correctAnswers: [],
      };
    }
  
    const sections = response.value.split("###").map(section => section.trim()).filter(Boolean);
    if (sections.length < 4) {
      return {
        studentName: '',
        finalScore: '',
        incorrectAnswers: 0,
        results: [],
        correctAnswers: [],
      };
    }
  
    const fileReview = sections[1].split("**").map(part => part.trim()).filter(Boolean);
    const studentName = fileReview.length > 2 ? fileReview[2].split(":")[1].trim() : '';
    const finalScore = fileReview.length > 4 ? fileReview[4].split(":")[1].trim() : '';
    const incorrectAnswers = fileReview.length > 6 ? parseInt(fileReview[6].split(":")[1].trim(), 10) : 0;
  
    const results = sections[2].split("**").map(text => text.trim()).filter(Boolean);
    const correctAnswers = sections[3].split("**").map(text => text.trim()).filter(Boolean);
  
    return {
      studentName,
      finalScore,
      incorrectAnswers,
      results,
      correctAnswers,
    };
  }
  