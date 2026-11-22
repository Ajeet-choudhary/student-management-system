let students = JSON.parse(localStorage.getItem('students')) || [
  { rollNo: 'BCA202601', name: 'Ajeet Choudhary', course: 'BCA', cgpa: 8.6 },
  { rollNo: 'BCA202602', name: 'Rohan Sharma', course: 'BCA', cgpa: 8.2 }
];

const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const totalStudentsEl = document.getElementById('totalStudents');
const avgCgpaEl = document.getElementById('avgCgpa');

function saveAndRender(filterText = '') {
  localStorage.setItem('students', JSON.stringify(students));
  renderTable(filterText);
  updateStats();
}

function renderTable(filterText = '') {
  tableBody.innerHTML = '';
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(filterText.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(filterText.toLowerCase())
  );

  filtered.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.rollNo}</td>
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td>${Number(student.cgpa).toFixed(2)}</td>
      <td><button class="btn-delete" onclick="deleteStudent(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function updateStats() {
  totalStudentsEl.textContent = students.length;
  if (students.length === 0) {
    avgCgpaEl.textContent = '0.00';
    return;
  }
  const sum = students.reduce((acc, s) => acc + Number(s.cgpa), 0);
  avgCgpaEl.textContent = (sum / students.length).toFixed(2);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newStudent = {
    name: document.getElementById('name').value.trim(),
    rollNo: document.getElementById('rollNo').value.trim(),
    course: document.getElementById('course').value.trim(),
    cgpa: parseFloat(document.getElementById('cgpa').value)
  };
  students.push(newStudent);
  form.reset();
  saveAndRender(searchInput.value);
});

function deleteStudent(index) {
  students.splice(index, 1);
  saveAndRender(searchInput.value);
}

searchInput.addEventListener('input', (e) => {
  renderTable(e.target.value);
});

saveAndRender();