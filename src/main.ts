import "./style.css";

const tableData: string[][] = [];
new Array(1000).fill(0).forEach((_) => {
  const row: string[] = [];
  new Array(9).fill(0).forEach((_) => {
    row.push(
      (Math.random() * 100).toLocaleString("en", {
        maximumFractionDigits: 2,
        useGrouping: false,
      })
    );
  });
  tableData.push(row);
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
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

const tbody = document.querySelector("tbody");
tableData.forEach((row) => {
  const tr = document.createElement("tr");
  row.forEach((cell) => {
    const td = document.createElement("td");
    td.innerHTML = cell;
    tr.appendChild(td);
  });
  tbody?.appendChild(tr);
});
