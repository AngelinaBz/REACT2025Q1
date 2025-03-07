import { render } from '@testing-library/react';

import Loading from '@/components/loading/Loading';

describe('Loading Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Loading />);
    expect(container).toBeInTheDocument();
  });

  it('should have the correct class name', () => {
    const { container } = render(<Loading />);
    const loadingDiv = container.querySelector('.loading');
    expect(loadingDiv).toBeInTheDocument();
  });
});
