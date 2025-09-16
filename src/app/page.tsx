import { CVBuilder } from '../components/cv/CVBuilder';
import { PDFTest } from '../components/test/PDFTest';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <CVBuilder />
    </main>
  );
}
