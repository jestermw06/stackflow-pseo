import ComparisonTemplate from '../../components/ComparisonTemplate';

export default function TestComparisonPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <ComparisonTemplate 
        softwareA={{ 
          name: 'Test A', 
          category: 'Testing', 
          description: 'Desc A', 
          key_features: ['Feature 1'], 
          official_url: '#' 
        }}
        softwareB={{ 
          name: 'Test B', 
          category: 'Testing', 
          description: 'Desc B', 
          key_features: ['Feature 2'], 
          official_url: '#' 
        }}
        verdict="Test Verdict"
        verdictReason="This is a test reason."
        prosA={['Pro A1']}
        consA={['Con A1']}
        prosB={['Pro B1']}
        consB={['Con B1']}
      />
    </main>
  );
}