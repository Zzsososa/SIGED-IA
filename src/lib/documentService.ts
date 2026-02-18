// Mock data for the first advance
export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  date: string;
  size: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Contrato de Arrendamiento - V.1.pdf', type: 'PDF', date: '15/02/2026', size: '1.2 MB' },
  { id: '2', name: 'Acta Constitutiva - Grupo A.docx', type: 'DOCX', date: '14/02/2026', size: '850 KB' },
  { id: '3', name: 'Presupuesto Trimestral 2026.xlsx', type: 'XLSX', date: '10/02/2026', size: '2.5 MB' },
  { id: '4', name: 'Demanda Laboral - Expediente 45/26.pdf', type: 'PDF', date: '08/02/2026', size: '3.1 MB' },
];

export async function getDocuments(): Promise<Document[]> {
  // Simulate DB latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDocuments), 500);
  });
}

export async function uploadDocument(doc: Document): Promise<Document> {
  mockDocuments.unshift(doc);
  return doc;
}
