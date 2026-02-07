import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { BrandProfile } from '@/types';
import { brandService } from '@/services/brand.service';

export const SimpleBrandCreator: React.FC = () => {
    const [brandName, setBrandName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateBrand = async () => {
        if (!brandName.trim()) return;
        
        setIsCreating(true);
        try {
            const result = await brandService.createBrand({
                name: brandName,
                doctrine: 'Test brand doctrine',
                workspaceId: 'default'
            });
            
            if (result.success) {
                setBrandName('');
                alert('Brand created successfully!');
            } else {
                alert(`Failed to create brand: ${result.error}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <Card className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Test Brand Creation</h2>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter brand name"
                    className="w-full px-3 py-2 border rounded"
                    disabled={isCreating}
                />
                <Button 
                    onClick={handleCreateBrand}
                    disabled={isCreating || !brandName.trim()}
                    className="w-full"
                >
                    {isCreating ? 'Creating...' : 'Create Brand'}
                </Button>
            </Card>
        </div>
    );
};
