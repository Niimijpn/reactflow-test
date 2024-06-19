import * as d3 from "d3";

// CSVファイルを読み込む関数
export const loadCSV = (
  file: File,
  setCsvData: (data: any[]) => void
): void => {
  const reader = new FileReader();
  reader.onload = (): void => {
    const data: any[] = d3.csvParse(reader.result as string);
    console.log("CSV Data:", data); // CSVデータをコンソールに出力して確認
    setCsvData(data);
  };
  reader.readAsText(file);
};

// ノードからデータを抽出する関数
export interface Node {
  data: {
    type: string;
    label: string;
  };
}

export interface CsvData {
  [key: string]: string;
}

export const extractData = (nodes: Node[], csvData: CsvData[]): void => {
  if (!csvData) {
    alert("Please load a CSV file first.");
    return;
  }

  const rowNode = nodes.find((node) => node.data.type === "row");
  const colNode = nodes.find((node) => node.data.type === "col");

  if (!rowNode || !colNode) {
    alert("Please add and connect row and column nodes.");
    return;
  }

  const rowIndex = parseInt(rowNode.data.label);
  const colName = colNode.data.label;

  console.log("Row Index:", rowIndex); // 行インデックスをコンソールに出力して確認
  console.log("Column Name:", colName); // 列名をコンソールに出力して確認

  //   if (isNaN(rowIndex) || rowIndex < 0 || rowIndex >= csvData.length) {
  //     alert("Invalid row index.");
  //     return;
  //   }

  //   if (!csvData[rowIndex].hasOwnProperty(colName)) {
  //     alert("Invalid column name.");
  //     return;
  //   }

  console.log("CSV Data:", csvData); // CSVデータをコンソールに出力して確認
  const value = csvData[rowIndex - 1][colName];
  alert(`Value at row ${rowIndex}, column ${colName}: ${value}`);
};
