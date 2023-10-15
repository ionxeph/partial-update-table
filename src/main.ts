import './style.css';
import { VisibleSlice } from './visible-slice';

const slice = new VisibleSlice(10);
const observer = slice.getObserver();
const tableData: string[][] = [];
new Array(1000).fill(0).forEach((_) => {
  const row: string[] = [];
  new Array(9).fill(0).forEach((_) => {
    row.push(
      (Math.random() * 100).toLocaleString('en', {
        maximumFractionDigits: 2,
        useGrouping: false,
      })
    );
  });
  tableData.push(row);
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <table>
    <thead>
      <tr>
        <th>col 1</th>
        <th>col 2</th>
        <th>col 3</th>
        <th>col 4</th>
        <th>col 5</th>
        <th>col 6</th>
        <th>col 7</th>
        <th>col 8</th>
        <th>col 9</th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>
`;

const tbody = document.querySelector('tbody');
tableData.forEach((row, id) => {
  const tr = document.createElement('tr');
  tr.id = `${id}`;
  row.forEach((cell) => {
    const td = document.createElement('td');
    td.innerHTML = cell;
    tr.appendChild(td);
  });
  observer.observe(tr);
  tbody?.appendChild(tr);
});

function updateData() {
  tableData.forEach((row) => {
    for (let i = 0; i < 10; i++) {
      row[i] = (Math.random() * 100).toLocaleString('en', {
        maximumFractionDigits: 2,
        useGrouping: false,
      });
    }
  });
}

function updateTable() {
  updateData();
  console.log(slice.getVisibleRows());
  slice.getVisibleRows().forEach((id) => {
    document
      .getElementById(id)
      ?.querySelectorAll('td')
      .forEach((cell, i) => {
        const prev = Number(cell.innerHTML);
        const next = Number(tableData[Number(id)][i]);
        if (prev < next) {
          cell.style.color = 'green';
        } else {
          cell.style.color = 'red';
        }
        cell.innerHTML = `${next}`;
      });
  });
}

setInterval(() => {
  updateTable();
}, 1000);
