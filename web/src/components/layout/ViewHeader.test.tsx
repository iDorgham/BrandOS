import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { LayoutGrid } from 'lucide-react';

describe('ViewHeader', () => {
    it('renders title and subtitle correctly', () => {
        render(
            <ViewHeader
                icon={LayoutGrid}
                title="Nexus"
                subtitle="Dashboard"
            />
        );

        expect(screen.getByText('Nexus')).toBeInTheDocument();
        expect(screen.getByText('// Dashboard')).toBeInTheDocument();
    });

    it('renders badge when provided', () => {
        render(
            <ViewHeader
                icon={LayoutGrid}
                title="Nexus"
                subtitle="Dashboard"
                badge="Custom Protocol"
            />
        );

        expect(screen.getByText('Custom Protocol')).toBeInTheDocument();
    });

    it('renders rightContent when provided', () => {
        render(
            <ViewHeader
                icon={LayoutGrid}
                title="Nexus"
                subtitle="Dashboard"
                rightContent={<div data-testid="right-side">Right Content</div>}
            />
        );

        expect(screen.getByTestId('right-side')).toBeInTheDocument();
    });
});
