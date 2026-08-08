import ComparisonTemplate from '../../components/ComparisonTemplate';

export default function TestComparisonPage() {
  return (
    <main>
      <ComparisonTemplate
        softwareA={{
          id: 'test-a',
          name: 'Test A',
          category: 'Testing',
          description: 'Desc A',
          key_features: ['Feature 1'],
          official_url: '#',
        }}
        softwareB={{
          id: 'test-b',
          name: 'Test B',
          category: 'Testing',
          description: 'Desc B',
          key_features: ['Feature 2'],
          official_url: '#',
        }}
        verdict="Test Verdict"
        verdictReason="This is a test reason."
        prosA={['Pro A1']}
        consA={['Con A1']}
        prosB={['Pro B1']}
        consB={['Con B1']}
        comparisonPoints={[
          { feature: 'Feature 1', softwareA: true, softwareB: false },
          { feature: 'Feature 2', softwareA: false, softwareB: true },
        ]}
      />
    </main>
  );
}
