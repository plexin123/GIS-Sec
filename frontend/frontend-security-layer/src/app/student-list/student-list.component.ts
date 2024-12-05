import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import the necessary modules
import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  paginatedStudents: Student[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  private geminiApiKey = 'AIzaSyDDfENOIpoXnLMu6XHftdBAbdwbdEz5pks'; // Replace with your actual Gemini API key

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.filteredStudents = [...students];
        this.paginateStudents();
      },
      error: () => {
        this.errorMessage = 'Error fetching students!';
      },
    });
  }

  async getRecommendation(student: Student): Promise<void> {
    const prompt = `Suggest extracurricular activities or courses for the following student: ${JSON.stringify(
      student
    )} based on the name keep it short with 3 bullet points`;

    try {
      // Initialize GoogleGenerativeAI with your API key
      const genAI = new GoogleGenerativeAI(this.geminiApiKey);

      // Select the model (for example, gemini-1.5-flash)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Generate content based on the provided prompt
      const result = await model.generateContent(prompt);

      // Get the generated response text
      const recommendationText = result.response.text();

      // Update the student's recommendation field
      student.recommendation = recommendationText;

      // Alternatively, you can alert the user:
      alert(`Recommendation: ${recommendationText}`);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      alert('Failed to fetch recommendation. Please try again later.');
    }
  }

  filterStudents(): void {
    this.currentPage = 1;
    this.filteredStudents = this.students.filter((student) =>
      student.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.paginateStudents();
  }

  paginateStudents(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedStudents = this.filteredStudents.slice(start, end);
  }

  setPage(page: number): void {
    if (page < 1 || page > Math.ceil(this.filteredStudents.length / this.itemsPerPage)) {
      return;
    }
    this.currentPage = page;
    this.paginateStudents();
  }

  addStudent(): void {
    this.router.navigate(['/registerStudent']);
  }
}
